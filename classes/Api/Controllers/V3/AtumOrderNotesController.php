<?php
/**
 * Abstract REST API's ATUM Order Notes controller
 *
 * @since       1.6.2
 * @author      Be Rebel - https://berebel.io
 * @copyright   ©2019 Stock Management Labs™
 *
 * @package     Atum\Api\Controllers
 * @subpackage  V3
 */

namespace Atum\Api\Controllers\V3;

use Atum\Components\AtumOrders\AtumComments;
use Atum\Components\AtumOrders\Models\AtumOrderModel;


defined( 'ABSPATH' ) || exit;

abstract class AtumOrderNotesController extends \WC_REST_Order_Notes_Controller {

	/**
	 * Endpoint namespace
	 *
	 * @var string
	 */
	protected $namespace = 'wc/v3';

	/**
	 * Get the Purchase Order Notes schema, conforming to JSON Schema
	 *
	 * @since 1.6.2
	 *
	 * @return array
	 */
	public function get_item_schema() {

		$schema = parent::get_item_schema();

		unset( $schema['properties']['customer_note'] );
		$schema['properties']['added_by_user']['context'][] = 'view';

		return $schema;

	}

	/**
	 * Get the query params for collections
	 *
	 * @since 1.6.2
	 *
	 * @return array
	 */
	public function get_collection_params() {

		$params = array();

		$params['type'] = array(
			'default'           => 'any',
			'description'       => __( 'Limit result to user or system notes.', ATUM_TEXT_DOMAIN ),
			'type'              => 'string',
			'enum'              => array( 'any', 'user', 'system' ),
			'sanitize_callback' => 'sanitize_key',
			'validate_callback' => 'rest_validate_request_arg',
		);

		return $params;

	}

	/**
	 * Prepare a single order note output for response
	 *
	 * @since 1.6.2
	 *
	 * @param \WP_Comment      $note    Order note object.
	 * @param \WP_REST_Request $request Request object.
	 *
	 * @return \WP_REST_Response $response Response data.
	 */
	public function prepare_item_for_response( $note, $request ) {

		$data = array(
			'id'               => (int) $note->comment_ID,
			'author'           => $note->comment_author,
			'date_created'     => wc_rest_prepare_date_response( $note->comment_date ),
			'date_created_gmt' => wc_rest_prepare_date_response( $note->comment_date_gmt ),
			'note'             => $note->comment_content,
			'added_by_user'    => 'ATUM' !== $note->comment_author,
		);

		$context = ! empty( $request['context'] ) ? $request['context'] : 'view';
		$data    = $this->add_additional_fields_to_object( $data, $request );
		$data    = $this->filter_response_by_context( $data, $context );

		// Wrap the data in a response object.
		$response = rest_ensure_response( $data );

		$response->add_links( $this->prepare_links( $note ) );

		/**
		 * Filter ATUM order note object returned from the REST API
		 *
		 * @param \WP_REST_Response $response The response object.
		 * @param \WP_Comment       $note     Order note object used to create response.
		 * @param \WP_REST_Request  $request  Request object.
		 */
		return apply_filters( 'atum/api/rest_prepare_atum_order_note', $response, $note, $request );

	}

	/**
	 * Get order notes from an ATUM Order
	 *
	 * @since 1.6.2
	 *
	 * @param AtumOrderModel   $order
	 * @param \WP_REST_Request $request Request data.
	 *
	 * @return \WP_REST_Response
	 */
	protected function get_order_notes( $order, $request ) {

		$args = array(
			'post_id' => $order->get_id(),
			'approve' => 'approve',
			'type'    => AtumComments::NOTES_KEY,
		);

		// Bypass the AtumComments filter to get rid of ATUM Order notes comments from queries.
		$atum_comments = AtumComments::get_instance();

		remove_filter( 'comments_clauses', array( $atum_comments, 'exclude_atum_order_notes' ) );
		$notes = get_comments( $args );
		add_filter( 'comments_clauses', array( $atum_comments, 'exclude_atum_order_notes' ) );

		$data = array();
		foreach ( $notes as $note ) {

			/**
			 * Variable definition
			 *
			 * @var \WP_Comment $note
			 */
			if (
				( 'system' === $request['type'] && 'ATUM' !== $note->comment_author ) ||
				( 'user' === $request['type'] && 'ATUM' === $note->comment_author )
			) {
				continue;
			}

			$order_note = $this->prepare_item_for_response( $note, $request );
			$order_note = $this->prepare_response_for_collection( $order_note );
			$data[]     = $order_note;

		}

		return rest_ensure_response( $data );

	}

	/**
	 * Get a single ATUM order note.
	 *
	 * @since 1.6.2
	 *
	 * @param AtumOrderModel   $order   The ATUM Order where the order resides.
	 * @param \WP_REST_Request $request Full details about the request.
	 *
	 * @return \WP_Error|\WP_REST_Response
	 */
	public function get_order_note( $order, $request ) {

		$id   = (int) $request['id'];
		$note = get_comment( $id );

		if ( empty( $id ) || empty( $note ) || intval( $note->comment_post_ID ) !== intval( $order->get_id() ) ) {
			return new \WP_Error( 'atum_rest_invalid_id', __( 'Invalid resource ID.', ATUM_TEXT_DOMAIN ), [ 'status' => 404 ] );
		}

		$order_note = $this->prepare_item_for_response( $note, $request );
		$response   = rest_ensure_response( $order_note );

		return $response;

	}

	/**
	 * Create a single ATUM order note
	 *
	 * @since 1.6.2
	 *
	 * @param AtumOrderModel   $order   The ATUM order where the notes will be saved.
	 * @param \WP_REST_Request $request Full details about the request.
	 *
	 * @return \WP_Error|\WP_REST_Response
	 */
	public function create_order_note( $order, $request ) {

		// Create the note.
		$note_id = $order->add_note( $request['note'], $request['added_by_user'] );

		if ( ! $note_id ) {
			return new \WP_Error( 'atum_api_cannot_create_order_note', __( 'Cannot create order note, please try again.', ATUM_TEXT_DOMAIN ), [ 'status' => 500 ] );
		}

		$note = get_comment( $note_id );
		$this->update_additional_fields_for_object( $note, $request );

		/**
		 * Fires after a order note is created or updated via the REST API.
		 *
		 * @since 1.6.2
		 *
		 * @param \WP_Comment      $note    New order note object.
		 * @param \WP_REST_Request $request Request object.
		 */
		do_action( 'atum/api/rest_insert_order_note', $note, $request );

		$request->set_param( 'context', 'edit' );
		$response = $this->prepare_item_for_response( $note, $request );
		$response = rest_ensure_response( $response );
		$response->set_status( 201 );
		$response->header( 'Location', rest_url( sprintf( '/%s/%s/%d', $this->namespace, str_replace( '(?P<order_id>[\d]+)', $order->get_id(), $this->rest_base ), $note_id ) ) );

		return $response;

	}

	/**
	 * Delete a single order note
	 *
	 * @since 1.6.2
	 *
	 * @param AtumOrderModel   $order   The ATUM Order where the comment to be deleted resides.
	 * @param \WP_REST_Request $request Full details about the request.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function delete_order_note( $order, $request ) {

		$id   = (int) $request['id'];
		$note = get_comment( $id );

		if ( empty( $id ) || empty( $note ) || intval( $note->comment_post_ID ) !== intval( $order->get_id() ) ) {
			return new \WP_Error( 'atum_rest_invalid_id', __( 'Invalid resource ID.', ATUM_TEXT_DOMAIN ), [ 'status' => 404 ] );
		}

		$request->set_param( 'context', 'edit' );
		$response = $this->prepare_item_for_response( $note, $request );

		$result = wc_delete_order_note( $note->comment_ID );

		if ( ! $result ) {
			return new \WP_Error( 'atum_rest_cannot_delete', __( 'The order note cannot be deleted.', ATUM_TEXT_DOMAIN ), [ 'status' => 500 ] );
		}

		/**
		 * Fires after a order note is deleted or trashed via the REST API
		 *
		 * @param \WP_Comment       $note     The deleted or trashed order note.
		 * @param \WP_REST_Response $response The response data.
		 * @param \WP_REST_Request  $request  The request sent to the API.
		 */
		do_action( 'atum/api/rest_delete_order_note', $note, $response, $request );

		return $response;

	}

}
