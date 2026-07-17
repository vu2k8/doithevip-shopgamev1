-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 16, 2026 at 07:04 AM
-- Server version: 5.7.39
-- PHP Version: 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shopgame`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL COMMENT 'Id category_account',
  `group_id` int(11) NOT NULL COMMENT 'Id groups_account',
  `type` enum('random','tuchon') NOT NULL DEFAULT 'random' COMMENT 'Thử Vận May - Tự Chọn',
  `seller_id` int(11) NOT NULL DEFAULT '0' COMMENT 'ID user đăng bán nick',
  `buyer_id` int(11) NOT NULL DEFAULT '0' COMMENT 'ID user mua nick',
  `taikhoan` varchar(255) DEFAULT NULL COMMENT 'Tài khoản encode',
  `matkhau` varchar(255) DEFAULT NULL COMMENT 'Mật khẩu encode',
  `detail` longtext,
  `image` mediumtext,
  `price` int(11) NOT NULL DEFAULT '0' COMMENT 'Giá bán',
  `sale` int(11) NOT NULL DEFAULT '0' COMMENT '% khuyến mại',
  `status` enum('1','0') NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

--
--


-- --------------------------------------------------------

--
-- Table structure for table `bankings`
--

CREATE TABLE `bankings` (
  `id` int(11) NOT NULL,
  `typeApi` enum('STC','PINO_API','RPAY') DEFAULT 'STC',
  `bankName` varchar(191) DEFAULT NULL,
  `textNameBank` varchar(191) DEFAULT NULL,
  `apiToken` text,
  `bankAccount` varchar(191) DEFAULT NULL,
  `bankUsername` text,
  `bankPassword` text,
  `bankOwner` varchar(191) DEFAULT NULL,
  `walletCookie` text,
  `fixed_fee` int(11) NOT NULL DEFAULT '0',
  `fees_percent` int(11) NOT NULL DEFAULT '0',
  `invoice_pay` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
--


-- --------------------------------------------------------

--
-- Table structure for table `cards_log`
--

CREATE TABLE `cards_log` (
  `id` int(11) NOT NULL,
  `charging_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `log` mediumtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
--


-- --------------------------------------------------------

--
-- Table structure for table `category_account`
--

CREATE TABLE `category_account` (
  `id` int(11) NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT '1',
  `name` varchar(255) DEFAULT NULL,
  `slug` text,
  `image` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

--
--


-- --------------------------------------------------------

--
-- Table structure for table `category_service`
--

CREATE TABLE `category_service` (
  `id` int(11) NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT '1',
  `name` varchar(255) DEFAULT NULL,
  `slug` text,
  `image` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

--
--


-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE `coupons` (
  `id` int(11) NOT NULL,
  `code` varchar(64) DEFAULT NULL,
  `amount` int(11) DEFAULT '0',
  `used` int(11) DEFAULT '0',
  `discount` float DEFAULT '0',
  `min` int(11) DEFAULT '1000',
  `max` int(11) DEFAULT '10000000',
  `product_id` longtext NOT NULL,
  `type` int(11) DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
--


-- --------------------------------------------------------

--
-- Table structure for table `coupon_used`
--

CREATE TABLE `coupon_used` (
  `id` int(11) NOT NULL,
  `coupon_id` int(11) DEFAULT '0',
  `user_id` int(11) DEFAULT '0',
  `trans_id` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `flash_sales`
--

CREATE TABLE `flash_sales` (
  `id` int(11) NOT NULL,
  `name` text,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
--


-- --------------------------------------------------------

--
-- Table structure for table `flash_sale_products`
--

CREATE TABLE `flash_sale_products` (
  `id` int(11) NOT NULL,
  `flash_sale_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `product_type` enum('account','groups_account','groups_service') NOT NULL DEFAULT 'account',
  `discount_price` int(11) DEFAULT NULL COMMENT 'Giá giảm cho account',
  `description` text COMMENT 'Mô tả cho nhóm/dịch vụ',
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
--


-- --------------------------------------------------------

--
-- Table structure for table `groups_account`
--

CREATE TABLE `groups_account` (
  `id` int(11) NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT '1',
  `category_id` int(11) DEFAULT NULL,
  `type` mediumtext,
  `name` varchar(255) DEFAULT NULL,
  `slug` mediumtext,
  `price` int(11) NOT NULL DEFAULT '0',
  `nhan` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` longtext,
  `detail` longtext,
  `buy_fake` int(11) NOT NULL DEFAULT '0',
  `view` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

--
--


-- --------------------------------------------------------

--
-- Table structure for table `groups_service`
--

CREATE TABLE `groups_service` (
  `id` int(11) NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT '1',
  `category_id` int(11) DEFAULT NULL,
  `type` mediumtext,
  `name` varchar(255) DEFAULT NULL,
  `slug` mediumtext,
  `nhan` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` longtext,
  `detail` longtext,
  `buy_fake` int(11) NOT NULL DEFAULT '0',
  `view` int(11) NOT NULL DEFAULT '0',
  `status` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

--
--


-- --------------------------------------------------------

--
-- Table structure for table `history_sendmail`
--

CREATE TABLE `history_sendmail` (
  `id` int(11) NOT NULL,
  `email` text NOT NULL,
  `types` text NOT NULL,
  `owner` text NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `time` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `informations`
--

CREATE TABLE `informations` (
  `id` int(11) NOT NULL,
  `code` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
--


-- --------------------------------------------------------

--
-- Table structure for table `inter_wallet_code`
--

CREATE TABLE `inter_wallet_code` (
  `id` int(11) NOT NULL,
  `wallet_code` varchar(255) DEFAULT NULL,
  `wallet_name` varchar(255) DEFAULT NULL,
  `support` varchar(255) DEFAULT '{"pino":"0","stc":"1"}'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
--


-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` int(11) NOT NULL,
  `request_id` varchar(255) DEFAULT NULL,
  `order_code` varchar(50) NOT NULL,
  `order_code_service` varchar(50) DEFAULT NULL,
  `order_type` varchar(50) NOT NULL COMMENT 'Loại Order (VD: buy, deposit, upgrade, extend)',
  `module` varchar(50) DEFAULT NULL COMMENT 'Loại dịch vụ (VD: hosting, vps, domain, source_code, license)',
  `service_json` text COMMENT 'ID dịch vụ',
  `user_id` int(11) NOT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `net_amount` double NOT NULL COMMENT 'Tổng tiền đã gồm tiền hàng, thuế, phí',
  `fees` double NOT NULL COMMENT 'Thuế và phí (chỉ lưu với mục đích xem)',
  `pay_amount` double NOT NULL,
  `paygate` varchar(50) NOT NULL COMMENT 'Cổng thanh toán gì',
  `bank_info` text,
  `card_info` varchar(255) DEFAULT NULL COMMENT 'Pin + Seri thẻ cào',
  `status` enum('unpaid','paid','cancel') DEFAULT 'unpaid' COMMENT 'Trạng thái thanh toán',
  `status_service` enum('100','99','1','3') NOT NULL DEFAULT '100',
  `description` text,
  `admin_note` text,
  `client_note` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
--


-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `ip` text,
  `device` text,
  `create_date` timestamp NULL DEFAULT NULL,
  `action` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
--


-- --------------------------------------------------------

--
-- Table structure for table `logs_balance`
--

CREATE TABLE `logs_balance` (
  `id` int(10) UNSIGNED NOT NULL,
  `trans_id` varchar(100) NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `money_before` double NOT NULL DEFAULT '0',
  `money_change` double NOT NULL DEFAULT '0',
  `money_after` double NOT NULL DEFAULT '0',
  `type` enum('+','-') NOT NULL DEFAULT '+',
  `content` text,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
--


-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `url` text NOT NULL,
  `menu_type` varchar(255) DEFAULT NULL,
  `parent_id` int(11) DEFAULT '0',
  `level` int(11) DEFAULT '1',
  `children_count` int(11) DEFAULT '0',
  `sort_order` int(11) DEFAULT NULL,
  `status` tinyint(4) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
--


-- --------------------------------------------------------

--
-- Table structure for table `menu_quick_acces`
--

CREATE TABLE `menu_quick_acces` (
  `id` int(11) NOT NULL,
  `sort_order` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` mediumtext,
  `url` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
--


-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `news_slug` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `view_count` int(11) DEFAULT '0',
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `cats` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
--


-- --------------------------------------------------------

--
-- Table structure for table `news_cats`
--

CREATE TABLE `news_cats` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `url_key` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
--


-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `receive_id` int(11) NOT NULL DEFAULT '0',
  `order_code` varchar(50) NOT NULL,
  `category_id` int(11) NOT NULL DEFAULT '0',
  `group_id` int(11) NOT NULL DEFAULT '0',
  `service_type` varchar(50) NOT NULL COMMENT 'hosting, vps, domain, license, source_code, etc',
  `service_json` text,
  `status` varchar(50) NOT NULL DEFAULT '99',
  `amount` int(11) NOT NULL DEFAULT '0',
  `log_msg` text,
  `note` text,
  `refund` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
--


-- --------------------------------------------------------

--
-- Table structure for table `pack_service`
--

CREATE TABLE `pack_service` (
  `id` int(11) NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT '1',
  `category_id` int(11) NOT NULL DEFAULT '0',
  `group_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT '0',
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

--
--


-- --------------------------------------------------------

--
-- Table structure for table `sendmail_driver`
--

CREATE TABLE `sendmail_driver` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `configs` text,
  `status` int(11) DEFAULT NULL,
  `driver` varchar(255) DEFAULT NULL,
  `installed` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
--


-- --------------------------------------------------------

--
-- Table structure for table `sendmail_setting`
--

CREATE TABLE `sendmail_setting` (
  `id` int(11) NOT NULL,
  `driver` varchar(50) NOT NULL,
  `from_email` varchar(50) NOT NULL,
  `from_name` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
--


-- --------------------------------------------------------

--
-- Table structure for table `seo`
--

CREATE TABLE `seo` (
  `id` int(11) NOT NULL,
  `link` varchar(500) DEFAULT NULL,
  `meta` text,
  `image` text,
  `lang` varchar(50) DEFAULT 'vi',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
--


-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `key` varchar(191) NOT NULL,
  `value` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
--


-- --------------------------------------------------------

--
-- Table structure for table `sliders`
--

CREATE TABLE `sliders` (
  `id` int(11) NOT NULL,
  `slider_name` varchar(255) NOT NULL,
  `slider_image` varchar(255) NOT NULL,
  `slider_text` text,
  `slider_url` varchar(255) DEFAULT NULL,
  `slider_btn_text` varchar(255) DEFAULT NULL,
  `slider_btn_url` varchar(255) DEFAULT NULL,
  `sort_order` int(11) DEFAULT '0',
  `status` tinyint(4) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
--


-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL COMMENT 'Họ và tên',
  `username` varchar(100) DEFAULT NULL COMMENT 'Tên người dùng',
  `password` varchar(255) DEFAULT NULL COMMENT 'Mật khẩu',
  `phone` varchar(20) DEFAULT NULL COMMENT 'Số điện thoại',
  `email` varchar(255) DEFAULT NULL COMMENT 'Địa chỉ email',
  `admin` tinyint(4) DEFAULT '0' COMMENT 'Quản trị viên (1 or 0)',
  `token` varchar(255) DEFAULT NULL COMMENT 'Token đăng nhập',
  `token_expiry` varchar(255) NOT NULL COMMENT 'Thời gian hết hạn token',
  `api_key` varchar(255) DEFAULT NULL,
  `ip` varchar(45) DEFAULT NULL COMMENT 'Địa chỉ ip',
  `device` varchar(500) DEFAULT NULL COMMENT 'Thiết bị',
  `money` bigint(20) NOT NULL DEFAULT '0' COMMENT 'Số tiền hiện có',
  `total_money` bigint(20) NOT NULL DEFAULT '0' COMMENT 'Tổng tiền đã nạp',
  `banned` bigint(20) NOT NULL DEFAULT '0' COMMENT 'Ban tài khoản (1 or 0)',
  `failed` tinyint(4) DEFAULT '0' COMMENT 'Số lần đăng nhập sai',
  `failed_reason` varchar(255) DEFAULT NULL COMMENT 'Mô tả lí do sai',
  `create_date` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo tài khoản',
  `update_date` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian đăng nhập gần nhất',
  `social_type` varchar(50) DEFAULT NULL COMMENT 'Login bằng mxh gì?',
  `social_id` varchar(255) DEFAULT NULL COMMENT 'Mxh id',
  `twofactor` varchar(100) DEFAULT NULL COMMENT 'Bảo mật bằng gì?',
  `twofactor_secret` varchar(255) DEFAULT NULL COMMENT 'Mã bảo mật',
  `tmp_token` varchar(250) DEFAULT NULL COMMENT 'Token dùng để xác thực 1 lần',
  `last_reset_request` int(11) DEFAULT '0' COMMENT 'Lưu thời gian (timestamp) của lần gần nhất người dùng thực hiện yêu cầu khôi phục mật khẩu (reset password).'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
--


--
-- Indexes for dumped tables
--


--
-- Seed data
--

INSERT INTO `settings` (`id`, `key`, `value`) VALUES
(1, 'title', 'Shop Game V1'),
(2, 'description', 'Shop mua ban acc, cay thue va dich vu game.'),
(3, 'keywords', 'shop game, mua acc, ban acc'),
(4, 'favicon', ''),
(5, 'logo_light', ''),
(6, 'logo_dark', ''),
(7, 'anhbia', ''),
(8, 'copyright', 'DoiTheVip.Com'),
(9, 'email', ''),
(10, 'phone', ''),
(11, 'status_website', '1'),
(12, 'status_demo', '0'),
(13, 'session_login', '36000'),
(14, 'google_client_id', ''),
(15, 'google_client_secret', ''),
(16, 'facebook_client_id', ''),
(17, 'facebook_client_secret', ''),
(18, 'facebook_graph_version', 'v24.0'),
(19, 'fees', '0'),
(20, 'fees_napthecao', '20'),
(21, 'pin_cron', ''),
(22, 'check_time_cron_invoice', '0'),
(23, 'max_time_cron_invoice', '1'),
(24, 'deposit_daily_limit', '5000000'),
(25, 'deposit_min_amount', '5000'),
(26, 'deposit_max_amount', '5000000'),
(27, 'password_hash', 'md5'),
(28, 'notice_popup', ''),
(29, 'phanthuong_popup', ''),
(30, 'theme_color_top', '#14a74b'),
(31, 'theme_color_footer', '#14a74b'),
(32, 'cf_enable', '0'),
(33, 'cf_site_key', ''),
(34, 'cf_secret_key', ''),
(35, 'card_partner_id', ''),
(36, 'card_partner_key', ''),
(37, 'location_danhmuc', 'muanick-dichvu'),
(38, 'status_noti_sell', '1'),
(39, 'status_menu_quick_access', '1'),
(40, 'status_flash_sale', '1'),
(41, 'title_flash_sale', 'Flash Sale'),
(42, 'invoice_expire_time', '900'),
(43, 'check_time_cron_delivery', '0'),
(44, 'check_time_cron_expires', '0'),
(45, 'check_time_cron_suspended', '0');

INSERT INTO `inter_wallet_code` (`id`, `wallet_code`, `wallet_name`, `support`) VALUES
(1, 'ACB', 'NGAN HANG TMCP A CHAU (ACB)', '{"pino":"1","stc":"1","rpay":"1"}'),
(2, 'TPBANK', 'NGAN HANG TMCP TIEN PHONG (TPBANK)', '{"pino":"0","stc":"1","rpay":"1"}'),
(3, 'VIETCOMBANK', 'NGAN HANG TMCP NGOAI THUONG VIET NAM (VIETCOMBANK)', '{"pino":"0","stc":"1","rpay":"1"}'),
(4, 'MBBANK', 'NGAN HANG TMCP QUAN DOI (MBBANK)', '{"pino":"0","stc":"1","rpay":"1"}'),
(5, 'BIDV', 'NGAN HANG TMCP DAU TU VA PHAT TRIEN VIET NAM (BIDV)', '{"pino":"0","stc":"1","rpay":"1"}'),
(6, 'VIETINBANK', 'NGAN HANG TMCP CONG THUONG VIET NAM (VIETINBANK)', '{"pino":"0","stc":"1","rpay":"1"}'),
(7, 'SEABANK', 'NGAN HANG TMCP DONG NAM A (SEABANK)', '{"pino":"0","stc":"1","rpay":"1"}'),
(8, 'MSB', 'NGAN HANG TMCP HANG HAI VIET NAM (MSB)', '{"pino":"0","stc":"1","rpay":"1"}'),
(9, 'TIMO', 'NGAN HANG TMCP BAN VIET (TIMOBANK)', '{"pino":"0","stc":"1","rpay":"1"}'),
(10, 'AGRIBANK', 'NGAN HANG NONG NGHIEP VA PHAT TRIEN NONG THON (AGRIBANK)', '{"pino":"0","stc":"0","rpay":"1"}'),
(11, 'BVBANK', 'NGAN HANG TMCP BAO VIET (BVBANK)', '{"pino":"0","stc":"0","rpay":"1"}'),
(12, 'TECHCOMBANK', 'NGAN HANG TMCP KY THUONG VIET NAM (TECHCOMBANK)', '{"pino":"0","stc":"0","rpay":"1"}'),
(13, 'VPBANK', 'NGAN HANG TMCP VIET NAM THINH VUONG (VPBANK)', '{"pino":"0","stc":"0","rpay":"1"}'),
(14, 'LPBANK', 'NGAN HANG TMCP LOC PHAT VIET NAM (LPBANK)', '{"pino":"0","stc":"0","rpay":"1"}'),
(15, 'OCB', 'NGAN HANG TMCP PHUONG DONG (OCB)', '{"pino":"0","stc":"0","rpay":"1"}'),
(16, 'VIETTELPAY', 'VIETTEL MONEY (VIETTELPAY)', '{"pino":"0","stc":"0","rpay":"1"}');

INSERT INTO `users` (`id`, `name`, `username`, `password`, `phone`, `email`, `admin`, `token`, `token_expiry`, `api_key`, `ip`, `device`, `money`, `total_money`, `banned`, `failed`, `failed_reason`, `create_date`, `update_date`, `social_type`, `social_id`, `twofactor`, `twofactor_secret`, `tmp_token`, `last_reset_request`) VALUES
(1, 'Administrator', 'admin', '21232f297a57a5a743894a0e4a801fc3', NULL, NULL, 1, NULL, '0', NULL, NULL, NULL, 0, 0, 0, 0, NULL, NOW(), NOW(), NULL, NULL, NULL, NULL, NULL, 0),
(2, 'Thanh vien', 'thanhvien', 'e81c20665a765669ba51389b362ec15e', NULL, NULL, 0, NULL, '0', NULL, NULL, NULL, 0, 0, 0, 0, NULL, NOW(), NOW(), NULL, NULL, NULL, NULL, NULL, 0);

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `bankings`
--
ALTER TABLE `bankings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cards_log`
--
ALTER TABLE `cards_log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category_account`
--
ALTER TABLE `category_account`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `category_service`
--
ALTER TABLE `category_service`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `coupon_used`
--
ALTER TABLE `coupon_used`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `flash_sales`
--
ALTER TABLE `flash_sales`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `flash_sale_products`
--
ALTER TABLE `flash_sale_products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups_account`
--
ALTER TABLE `groups_account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups_service`
--
ALTER TABLE `groups_service`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `history_sendmail`
--
ALTER TABLE `history_sendmail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `informations`
--
ALTER TABLE `informations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `code` (`code`);

--
-- Indexes for table `inter_wallet_code`
--
ALTER TABLE `inter_wallet_code`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `wallet_code` (`wallet_code`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_code` (`order_code`);

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `logs_balance`
--
ALTER TABLE `logs_balance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `trans_id` (`trans_id`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu_quick_acces`
--
ALTER TABLE `menu_quick_acces`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`),
  ADD KEY `news_slug` (`news_slug`);

--
-- Indexes for table `news_cats`
--
ALTER TABLE `news_cats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `url_key` (`url_key`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_code` (`order_code`);

--
-- Indexes for table `pack_service`
--
ALTER TABLE `pack_service`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `sendmail_driver`
--
ALTER TABLE `sendmail_driver`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sendmail_setting`
--
ALTER TABLE `sendmail_setting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `seo`
--
ALTER TABLE `seo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `settings_key` (`key`);

--
-- Indexes for table `sliders`
--
ALTER TABLE `sliders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_token` (`token`),
  ADD UNIQUE KEY `api_key` (`api_key`),
  ADD UNIQUE KEY `uniq_username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `bankings`
--
ALTER TABLE `bankings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `cards_log`
--
ALTER TABLE `cards_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `category_account`
--
ALTER TABLE `category_account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `category_service`
--
ALTER TABLE `category_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `coupon_used`
--
ALTER TABLE `coupon_used`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `flash_sales`
--
ALTER TABLE `flash_sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `flash_sale_products`
--
ALTER TABLE `flash_sale_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `groups_account`
--
ALTER TABLE `groups_account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `groups_service`
--
ALTER TABLE `groups_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `history_sendmail`
--
ALTER TABLE `history_sendmail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `informations`
--
ALTER TABLE `informations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `inter_wallet_code`
--
ALTER TABLE `inter_wallet_code`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `logs_balance`
--
ALTER TABLE `logs_balance`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `menu_quick_acces`
--
ALTER TABLE `menu_quick_acces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `news_cats`
--
ALTER TABLE `news_cats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `pack_service`
--
ALTER TABLE `pack_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `sendmail_driver`
--
ALTER TABLE `sendmail_driver`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `sendmail_setting`
--
ALTER TABLE `sendmail_setting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `seo`
--
ALTER TABLE `seo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `sliders`
--
ALTER TABLE `sliders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
