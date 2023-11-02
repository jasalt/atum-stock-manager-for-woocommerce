<?php
/** @noinspection ALL */
/**
  * ATUM WooCommerce Inventory Management and Stock Tracking
  * @author      Be Rebel - https://berebel.io
  * @copyright   ©2023 Stock Management Labs™
 */
 namespace Atum\Addons; defined('ABSPATH') || die; use Atum\Components\AtumAdminNotices; use Atum\Components\AtumAdminModal; use Atum\Inc\Helpers; final class AddonsLoader { private $ksyfY = array('action_logs' => '1.1.5', 'export_pro' => '1.3.4', 'multi_inventory' => '1.5.0', 'product_levels' => '1.6.0', 'purchase_orders' => '0.0.1', 'stock_takes' => '0.0.1', 'pick_pack' => '0.0.1', 'barcodes_pro' => '0.0.1', 'units_of_measure' => '0.0.1', 'cost_price' => '0.0.1'); private $ptarp = array('action_logs' => '1.3.8', 'export_pro' => '1.5.8', 'multi_inventory' => '1.8.4', 'product_levels' => '1.9.0', 'purchase_orders' => '1.1.6', 'stock_takes' => '1.0.0', 'pick_pack' => '1.0.0', 'barcodes_pro' => '0.0.1', 'units_of_measure' => '0.0.1', 'cost_price' => '0.0.1'); private static $S7how = []; private static $bxvBo = []; private $ICYw2; public function __construct() { goto VZ6Fc; EnlFY: $RBHD7 = (array) apply_filters('atum/addons/loader/extra_addons', []); goto vB2fN; VZ6Fc: $this->ICYw2 = defined('ATUM_DEBUG') && TRUE === ATUM_DEBUG; goto EnlFY; TumL_: foreach ($RBHD7 as $u4sWO => $YrEHt) { goto H3IcY; ox6dP: bTflt: goto ABRpA; vBHK5: nJ07G: goto ox6dP; sOogR: $this->ptarp[$u4sWO] = $YrEHt; goto vBHK5; H3IcY: if (!(!array_key_exists($u4sWO, $this->ptarp) && version_compare($YrEHt, '0.0', '>'))) { goto nJ07G; } goto sOogR; ABRpA: } goto MVwcB; tZdll: add_action('after_setup_theme', array($this, 'load_addons'), 99); goto mqxix; mqxix: $this->check_addons(); goto M6f5R; MVwcB: arWzN: goto qPRyn; qPRyn: ANXGF: goto tZdll; vB2fN: if (empty($RBHD7)) { goto ANXGF; } goto TumL_; M6f5R: } public function load_addons() { goto FPUyK; oDm_v: MTBF5: goto VwKdL; oITLd: $YITlc = Addons::get_keys(); goto tf38J; juNwS: $SQCSo->set_js_dependencies(['atum-trials-modal']); goto TrXXz; atKIB: c4Ha2: goto F3lO9; DWa08: uRyh4: goto oDm_v; tf38J: $HnTM0 = Addons::get_addons_paths(); goto yH4WF; f7atr: add_action('admin_enqueue_scripts', function () { goto na0bq; na0bq: Helpers::register_swal_scripts(); goto upCk9; n9p2m: wp_localize_script('atum-trials-modal', 'atumTrialsModal', array('cancel' => __('Cancel', ATUM_TEXT_DOMAIN), 'extend' => __('Yes, Extend it!', ATUM_TEXT_DOMAIN), 'nonce' => wp_create_nonce(ATUM_PREFIX . 'manage_license'), 'ok' => __('OK', ATUM_TEXT_DOMAIN), 'success' => __('Success!', ATUM_TEXT_DOMAIN), 'trialExtension' => __('Trial extension', ATUM_TEXT_DOMAIN), 'trialWillExtend' => __('You are going to extend this trial for 7 days more', ATUM_TEXT_DOMAIN))); goto fIvOd; upCk9: wp_register_script('atum-trials-modal', ATUM_URL . 'assets/js/build/atum-trials-modal.js', ['jquery', 'sweetalert2'], ATUM_VERSION, TRUE); goto n9p2m; fIvOd: }, 1); goto y5Ad3; s165H: vu9F_: goto jP3ov; Lxv_e: Addons::set_installed_addons($ufx7h); goto DWa08; yH4WF: foreach ($ufx7h as $de0vj => $hncuA) { goto t7MJH; lsffH: $M0VKh = sprintf('trial_used' === $YITlc[$Msjnw]['status'] ? __('The ATUM %1$s could not be loaded because it has already been used on another site. Please, %2$supgrade to the full version%3$s.', ATUM_TEXT_DOMAIN) : __('The ATUM %1$s could not be loaded because its license is invalid. Please, %2$supgrade to the full version%3$s.', ATUM_TEXT_DOMAIN), $hncuA['name'], '<a href="' . $A1mFH . '" target="_blank">', '</a>'); goto nxe7X; z5aJ9: if (!(empty($YITlc[$Msjnw]['expires']) || strtotime($YITlc[$Msjnw]['expires']) <= time())) { goto WI_tV; } goto r9Vbc; reEwI: $this->show_notices($hncuA, $M0VKh); goto lk0e4; MLBt_: Addons::delete_status_transient($Msjnw); goto zWanE; zSv75: if (!(isset($ufx7h[$orBhM]) || !$this->ICYw2 && !empty($HnTM0[$orBhM]['basename']) && file_exists(WP_PLUGIN_DIR . '/' . $HnTM0[$orBhM]['basename']))) { goto m6Gxe; } goto i1W45; nxe7X: $this->show_notices($hncuA, $M0VKh); goto jpXR8; NjNwE: $Msjnw = strtolower($HnTM0[$orBhM]['name'] ?? ''); goto vpoda; v3GlR: $M0VKh = sprintf(__('The ATUM %1$s could not be loaded because its license is missing. Please, activate your trial from the %2$sadd-ons%3$s page.', ATUM_TEXT_DOMAIN), $hncuA['name'], '<a href="' . add_query_arg('page', 'atum-addons', admin_url('admin.php')) . '">', '</a>'); goto bzqLx; jnqSW: if (!in_array($YITlc[$Msjnw]['status'], ['trial_used', 'invalid', 'disabled', 'missing', 'key_mismatch'])) { goto Tuuce; } goto HZpJn; DsN8h: self::$bxvBo[] = $de0vj; goto c8pZ5; r9Vbc: $f9iPx[$de0vj] = $hncuA; goto hibia; i1W45: $M0VKh = sprintf(__('The ATUM %s could not be loaded because the full version is installed. To use the trial, uninstall the full version first.', ATUM_TEXT_DOMAIN), $hncuA['name']); goto Xyho1; ynS6j: goto PuISm; goto OhENX; GptZI: $M0VKh = sprintf(__('The ATUM %1$s add-on requires at least version %2$s to work with the current ATUM version. Please, update it.', ATUM_TEXT_DOMAIN), $hncuA['name'], $this->ptarp[$orBhM]); goto reEwI; WhAHb: self::$bxvBo[] = $de0vj; goto MLBt_; kQH0e: $f9iPx[$de0vj]['key'] = $YITlc[$Msjnw]['key']; goto Y3kym; Ibcyh: goto aRYSV; goto QAaIf; MGEXB: Addons::delete_status_transient($Msjnw); goto EZm8A; ChDCA: $ufx7h[$de0vj]['bootstrap'] = NULL; goto DsN8h; GSsl1: if ('now' === $f9iPx[$de0vj]['expires']) { goto RNkSk; } goto o_LHT; T6LfU: WI_tV: goto WC9bL; zRW5w: aRYSV: goto lpVBX; k1tY4: $ufx7h[$de0vj]['bootstrap'] = NULL; goto eySD1; vpoda: if (isset($this->ptarp[$orBhM])) { goto LGTwP; } goto Li34v; r1w8f: array_pop(self::$S7how); goto lUamh; s9S4u: if (!(empty($YITlc) || empty($YITlc[$Msjnw]) || empty($YITlc[$Msjnw]['key']))) { goto SWnqI; } goto v3GlR; jpXR8: $ufx7h[$de0vj]['bootstrap'] = NULL; goto WhAHb; hHnV5: LGTwP: goto H0WZs; IU6pB: self::$bxvBo[] = $de0vj; goto hJeJW; VDGeH: Ip2bh: goto WwFZ8; Li34v: $M0VKh = sprintf(__('The ATUM %s add-on could not be loaded because is not a known add-on.', ATUM_TEXT_DOMAIN), $hncuA['name']); goto BgGd3; t7MJH: $y1Bkv = strpos($de0vj, '_trial') !== FALSE || strpos($hncuA['basename'], 'trial') !== FALSE; goto VbJ1x; n2ph4: SWnqI: goto jnqSW; pOJJO: $VFCoF = call_user_func($hncuA['bootstrap']); goto Xx86Q; c8pZ5: Addons::delete_status_transient($Msjnw); goto Ibcyh; VbJ1x: $orBhM = $y1Bkv ? str_replace('_trial', '', $de0vj) : $de0vj; goto NjNwE; C3Srd: $this->show_notices($hncuA, $M0VKh . ' ' . sprintf(__('Click %1$shere%2$s to purchase the full version.', ATUM_TEXT_DOMAIN), '<a href="' . $hncuA['addon_url'] . '" target="_blank">', '</a>')); goto lc842; QAaIf: m6Gxe: goto s9S4u; zWanE: goto aRYSV; goto SbLQ6; Xyho1: $this->show_notices($hncuA, $M0VKh); goto ChDCA; HEGjN: self::$bxvBo[] = $de0vj; goto WZb3s; H0WZs: if (!version_compare($this->ptarp[$orBhM], $hncuA['version'], '>')) { goto f9ax5; } goto GptZI; mk1pj: if (!(!empty($hncuA['bootstrap']) && is_callable($hncuA['bootstrap']))) { goto dKO9F; } goto Gc9AT; lk0e4: $ufx7h[$de0vj]['bootstrap'] = NULL; goto JPc1o; XjLHz: PuISm: goto C3Srd; bzqLx: $this->show_notices($hncuA, $M0VKh); goto k1tY4; gcKlw: if (!$y1Bkv) { goto v1JoN; } goto zSv75; HZpJn: $loinD = array('key' => $YITlc[$Msjnw]['key'], 'url' => home_url()); goto vfVj2; Xx86Q: if (!(!$VFCoF && !empty($this->ksyfY[$de0vj]) && version_compare($this->ksyfY[$de0vj], $hncuA['version'], '<'))) { goto Ip2bh; } goto LBVxI; vfVj2: $A1mFH = add_query_arg($loinD, Addons::ADDONS_STORE_URL . 'my-upgrades/'); goto lsffH; rMOY4: $ufx7h[$de0vj]['bootstrap'] = NULL; goto HEGjN; Y3kym: $f9iPx[$de0vj]['extended'] = $YITlc[$Msjnw]['extended'] ?? FALSE; goto GSsl1; BgGd3: $this->show_notices($hncuA, $M0VKh); goto rMOY4; Gc9AT: self::$S7how[] = $de0vj; goto pOJJO; lc842: $ufx7h[$de0vj]['bootstrap'] = NULL; goto IU6pB; LBVxI: $ufx7h[$de0vj]['bootstrap'] = NULL; goto r1w8f; o_LHT: $M0VKh = sprintf(__('Your ATUM %1$s has expired on %2$s, and it has been disabled.', ATUM_TEXT_DOMAIN), $hncuA['name'], date_i18n(get_option('date_format'), strtotime($YITlc[$Msjnw]['expires']))); goto ynS6j; EZm8A: goto aRYSV; goto n2ph4; B6g2l: goto aRYSV; goto nYRPs; eySD1: self::$bxvBo[] = $de0vj; goto MGEXB; hibia: $f9iPx[$de0vj]['expires'] = $YITlc[$Msjnw]['expires'] ?? 'now'; goto kQH0e; OhENX: RNkSk: goto my9ep; lUamh: self::$bxvBo[] = $de0vj; goto VDGeH; hJeJW: goto aRYSV; goto T6LfU; WC9bL: v1JoN: goto mk1pj; my9ep: $M0VKh = sprintf(__('Your ATUM %1$s has expired and it has been disabled.', ATUM_TEXT_DOMAIN), $hncuA['name']); goto XjLHz; WwFZ8: dKO9F: goto zRW5w; WZb3s: goto aRYSV; goto hHnV5; SbLQ6: Tuuce: goto z5aJ9; nYRPs: f9ax5: goto gcKlw; JPc1o: self::$bxvBo[] = $de0vj; goto B6g2l; lpVBX: } goto s165H; TrXXz: $SQCSo->add_modal('trial-expired', array('icon' => 'warning', 'title' => _n('ATUM trial license expired!', 'ATUM trial licenses expired!', count($f9iPx), ATUM_TEXT_DOMAIN), 'showCancelButton' => FALSE, 'showConfirmButton' => FALSE, 'customClass' => ['container' => 'atum-trial-modal'], 'footer' => sprintf(__('Why are these add-ons expired and blocked? %1$sREAD INFO%2$s', ATUM_TEXT_DOMAIN), '&nbsp;<a href="https://stockmanagementlabs.crunch.help/en/atum-core/atum-trials" target="_blank">', '</a>')), Helpers::load_view_to_string('add-ons/expired-trials-modal', ['expired_trials' => $f9iPx])); goto atKIB; FPUyK: $ufx7h = Addons::get_installed_addons(); goto D1xMA; y5Ad3: $SQCSo = AtumAdminModal::get_instance([ATUM_SHORT_NAME . '-addons']); goto juNwS; D1xMA: if (empty($ufx7h)) { goto MTBF5; } goto NQ0Sg; F3lO9: if (!(count(self::$bxvBo) > 0)) { goto uRyh4; } goto Lxv_e; NQ0Sg: $f9iPx = []; goto oITLd; jP3ov: if (empty($f9iPx)) { goto c4Ha2; } goto f7atr; VwKdL: } public function check_addons() { add_filter('atum/queues/recurring_hooks', function ($Z_8Kk) { $Z_8Kk['atum/check_addons'] = array('time' => 'now', 'interval' => DAY_IN_SECONDS); return $Z_8Kk; }); add_action('atum/check_addons', function () { goto nipXl; PIqGd: $F4bS_ = FALSE; goto AuQDV; TqICb: uTi7U: goto DA9pu; hzPF0: if (!$F4bS_) { goto uTi7U; } goto AMDoR; a0A90: H7DS6: goto PIqGd; nHiHT: if (!(FALSE !== Addons::get_last_api_access('check_addons'))) { goto H7DS6; } goto z30R5; Z1nZ5: $zS0Tf = Addons::get_installed_addons(); goto nHiHT; wyix6: pkVbE: goto hzPF0; z30R5: return; goto a0A90; AMDoR: Addons::set_last_api_access('check_addons'); goto TqICb; nipXl: $l59CI = Addons::get_keys(); goto Z1nZ5; AuQDV: foreach ($zS0Tf as $whSIw) { goto QnOcb; A3PpF: $Hmo0w = json_decode(wp_remote_retrieve_body($wWpdp)); goto xtlEX; T6AqH: $F4bS_ = TRUE; goto paU0t; Q41vD: $mCsV5['extended'] = TRUE; goto kJhBP; MusXv: $wWpdp = Addons::check_license($njube, $Uu3YH['key']); goto tjSaK; ntUGt: $mCsV5['trial'] = TRUE; goto HpJOb; tjSaK: if (!(!is_wp_error($wWpdp) && isset($Uu3YH['status']) && 'valid' === $Uu3YH['status'])) { goto hxc4q; } goto A3PpF; vPmgI: g0tdZ: goto P0nvD; Wxs7B: if (!(strpos($njube, 'trial') !== FALSE)) { goto psmE3; } goto kzdy5; Z72LF: if (empty(array_diff_assoc($Uu3YH, $mCsV5))) { goto WvfeV; } goto mA3Lx; gwq86: O_eJF: goto IENxA; mA3Lx: Addons::update_key($njube, $mCsV5); goto rUU8u; ah7e6: $mCsV5['status'] = $Hmo0w->ULRSy; goto vPmgI; paU0t: $Uu3YH = $l59CI[$Msjnw]; goto MusXv; xP4d1: aybym: goto EbjOO; zvGUg: $mCsV5['expires'] = $Hmo0w->ucS40 ?? date_i18n('Y-m-d H:i:s'); goto BYR0M; xtlEX: $mCsV5 = $Uu3YH; goto VourR; IENxA: psmE3: goto xP4d1; HpJOb: fDxNp: goto EuNM8; VourR: if (!$Hmo0w) { goto Puv8M; } goto YBxQ8; kzdy5: $Msjnw = trim(str_replace('trial', '', $njube)); goto tCgPx; rUU8u: WvfeV: goto zxpvG; zxpvG: Puv8M: goto DRJ42; VX71Q: if (!(empty($Uu3YH['trial']) && isset($Hmo0w->tWsW0) && TRUE === $Hmo0w->tWsW0)) { goto fDxNp; } goto ntUGt; YBxQ8: if (!($Uu3YH['status'] !== $Hmo0w->ULRSy)) { goto g0tdZ; } goto ah7e6; P0nvD: if (!(empty($Uu3YH['expires']) || $Uu3YH['expires'] !== $Hmo0w->ucS40)) { goto a3A26; } goto zvGUg; tCgPx: if (!(is_array($l59CI) && array_key_exists($Msjnw, $l59CI))) { goto O_eJF; } goto T6AqH; DRJ42: hxc4q: goto gwq86; EuNM8: if (!(empty($Uu3YH['extended']) && (!isset($Hmo0w->Zkkjt) || TRUE !== $Hmo0w->Zkkjt))) { goto Togf6; } goto Q41vD; BYR0M: a3A26: goto VX71Q; kJhBP: Togf6: goto Z72LF; QnOcb: $njube = strtolower($whSIw['name']); goto Wxs7B; EbjOO: } goto wyix6; DA9pu: }); } private function show_notices($hncuA, $M0VKh) { AtumAdminNotices::add_notice($M0VKh, strtolower($hncuA['name']), 'error', FALSE, TRUE); add_action('after_plugin_row_' . $hncuA['basename'], function ($QgnWP, $WScLC) use($M0VKh) { goto lWeJ1; i9C9L: echo esc_attr($QgnWP); goto ABHle; VWKA8: ?></p>
					</div>
				</td>
			</tr>
			<style>tr[data-plugin="<?php  goto i9C9L; ABHle: ?>"] th, tr[data-plugin="<?php  goto nng7q; ey_bt: ?>"] td { box-shadow: none !important; }</style>
			<?php  goto ev4zV; lWeJ1: ?>
			<tr class="plugin-update-tr active">
				<td colspan="4" class="plugin-update colspanchange">
					<div class="notice inline notice-error notice-alt">
						<p><?php  goto n3mzd; n3mzd: echo $M0VKh; goto VWKA8; nng7q: echo esc_attr($QgnWP); goto ey_bt; ev4zV: }, 100, 2); } public static function get_bootstrapped_addons() { return self::$S7how; } public static function get_non_bootstrapped_addons() { return self::$bxvBo; } public static function check_addon($u4sWO, $njube, $ajkdE) { goto TS2yc; johKQ: if (!(stripos($ajkdE, '-trial.php') === FALSE)) { goto R450G; } goto ClRhV; KVtER: return FALSE; goto f0e94; x3QaD: return TRUE; goto oDE89; TS2yc: if (!(stripos($u4sWO, '_trial') === FALSE)) { goto C_r0Q; } goto aYflI; ClRhV: return FALSE; goto zlLlc; ZkOWg: if (!(stripos($njube, 'Trial') === FALSE)) { goto IRbFk; } goto KVtER; zlLlc: R450G: goto x3QaD; ZSdnF: C_r0Q: goto ZkOWg; f0e94: IRbFk: goto johKQ; aYflI: return FALSE; goto ZSdnF; oDE89: } }