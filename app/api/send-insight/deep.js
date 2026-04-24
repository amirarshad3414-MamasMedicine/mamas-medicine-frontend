export default function deepFormat(html) {
  return `<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:v="urn:schemas-microsoft-com:vml">

<head>
    <title>
    </title>
    <!--[if !mso]><!-->
    <meta content="IE=edge" http-equiv="X-UA-Compatible" />
    <!--<![endif]-->
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <!--[if mso]>
        <noscript>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        </noscript>
        <![endif]-->
    <!--[if lte mso 11]>
        <style type="text/css" data-inliner="ignore">
          .mj-outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
    <!--[if !mso]><!--><!--<![endif]-->
    <style>
        a:not([name]) {
            color: #000;
            text-decoration: underline
        }

        a:link {
            color: #000;
            text-decoration: underline
        }

        a:visited {
            color: #000;
            text-decoration: underline
        }

        a:active {
            color: #000;
            text-decoration: underline
        }

        a:hover {
            color: #000;
            text-decoration: underline
        }
    </style>
    <style>
        @import url(https://static-forms.klaviyo.com/fonts/api/v1/UDW68g/custom_fonts.css);

        #outlook a {
            padding: 0
        }

        body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%
        }

        table,
        td {
            border-collapse: collapse;
            mso-table-lspace: 0;
            mso-table-rspace: 0
        }

        img {
            border: 0;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic
        }

        p {
            display: block;
            margin: 13px 0
        }

        @media only screen and (min-width: 480px) {
            .mj-column-per-100 {
                width: 100% !important;
                max-width: 100%
            }
        }

        .moz-text-html .mj-column-per-100 {
            width: 100% !important;
            max-width: 100%
        }

        @media only screen and (max-width: 480px) {
            div.kl-row.colstack div.kl-column {
                display: block !important;
                width: 100% !important
            }
        }

        .hlb-subblk td {
            word-break: normal
        }

        @media only screen and (max-width: 480px) {
            .hlb-wrapper .hlb-block-settings-content {
                padding: 9px !important
            }

            .hlb-logo {
                padding-bottom: 9px !important
            }

            .r2-tbl {
                width: 100%
            }

            .r2-tbl .lnk {
                width: 100%
            }

            .r2-tbl .hlb-subblk>table {
                border-spacing: 5px !important;
                border-collapse: separate !important
            }

            .kl-hlb-stack {
                display: block !important;
                width: 100% !important;
                padding-right: 0 !important
            }

            .kl-hlb-stack.vspc {
                margin-bottom: 9px
            }

            .kl-hlb-wrap {
                display: inline-block !important;
                width: auto !important
            }

            .kl-hlb-no-wrap {
                display: table-cell !important
            }

            .kl-hlb-wrap.nospc.nospc {
                padding-right: 0 !important
            }
        }

        @media only screen and (max-width: 480px) {
            .component-wrapper .mob-no-spc {
                padding-left: 0 !important;
                padding-right: 0 !important
            }
        }

        @media only screen and (max-width: 480px) {
            td.kl-img-base-auto-width {
                width: 100% !important
            }
        }

        @media only screen and (max-width: 480px) {
            table.mj-full-width-mobile {
                width: 100% !important
            }

            td.mj-full-width-mobile {
                width: auto !important
            }
        }

        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            max-width: 100%
        }

        .root-container {
            background-repeat: repeat !important;
            background-size: auto !important;
            background-position: left top !important
        }

        .root-container-spacing {
            padding-top: 50px !important;
            padding-bottom: 20px !important;
            font-size: 0 !important
        }

        .content-padding {
            padding-left: 0 !important;
            padding-right: 0 !important
        }

        .content-padding.kl-first {
            padding-top: 0 !important
        }

        .content-padding.kl-last {
            padding-bottom: 0 !important
        }

        @media only screen and (max-width: 480px) {
            .root-container {
                background-repeat: repeat !important;
                background-size: auto !important;
                background-position: left top !important
            }

            .root-container-spacing {
                padding-top: 10px !important;
                padding-bottom: 10px !important;
                font-size: 0 !important
            }

            .content-padding {
                padding-left: 0 !important;
                padding-right: 0 !important
            }

            .content-padding.kl-first {
                padding-top: 0 !important
            }

            .content-padding.kl-last {
                padding-bottom: 0 !important
            }
        }

        @media only screen and (max-width: 480px) {

            body.mce-content-body,
            .kl-text>div,
            .kl-table-subblock>div,
            .kl-split-subblock>div {
                font-size: 14px !important;
                line-height: 1.3 !important
            }
        }

        h1 {
            color: #5D5E60;
            font-family: Helvetica, Arial, sans-serif;
            font-size: 48px;
            font-style: normal;
            font-weight: 400;
            line-height: 1.1;
            letter-spacing: 0;
            margin: 0;
            margin-bottom: 20px;
            text-align: left
        }

        @media only screen and (max-width: 480px) {
            h1 {
                font-size: 40px !important;
                line-height: 1.1 !important
            }
        }

        h2 {
            color: #5D5E60;
            font-family: Helvetica, Arial, sans-serif;
            font-size: 36px;
            font-style: normal;
            font-weight: 400;
            line-height: 1.1;
            letter-spacing: 0;
            margin: 0;
            margin-bottom: 16px;
            text-align: left
        }

        @media only screen and (max-width: 480px) {
            h2 {
                font-size: 32px !important;
                line-height: 1.1 !important
            }
        }

        h3 {
            color: #5D5E60;
            font-family: Helvetica, Arial, sans-serif;
            font-size: 32px;
            font-style: normal;
            font-weight: 400;
            line-height: 1.1;
            letter-spacing: 0;
            margin: 0;
            margin-bottom: 12px;
            text-align: left
        }

        @media only screen and (max-width: 480px) {
            h3 {
                font-size: 24px !important;
                line-height: 1.1 !important
            }
        }

        p {
            margin-left: 0;
            margin-right: 0;
            margin-top: 0;
            margin-bottom: 0;
            padding-bottom: 1em
        }

        @media only screen and (max-width: 480px) {
            .kl-text {
                padding-right: 18px !important;
                padding-left: 18px !important
            }
        }
    </style>
</head>

<body style="word-spacing:normal;background-color:#f5f5f7;">
    <div class="root-container" id="bodyTable" style="background-color:#f5f5f7;">
        <div class="root-container-spacing">
            <!-- LOGO HEADER SECTION -->
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section" role="presentation"
                style="width:100%;">
                <tbody>
                    <tr>
                        <td>
                            <div style="margin:0px auto;max-width:600px;">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                    style="width:100%;">
                                    <tbody>
                                        <tr>
                                            <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
                                                <div
                                                    style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;border-radius:0px 0px 0px 0px;max-width:600px;">
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                        role="presentation"
                                                        style="background:#FFFFFF;background-color:#FFFFFF;width:100%;border-radius:0px 0px 0px 0px;">
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-left:0px;padding-right:0px;padding-top:0px;text-align:center;">
                                                                    <div class="content-padding kl-first">
                                                                        <div class="kl-row colstack"
                                                                            style="display:table;table-layout:fixed;width:100%;">
                                                                            <div class="kl-column"
                                                                                style="display:table-cell;vertical-align:top;width:100%;">
                                                                                <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper hlb-wrapper"
                                                                                    style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
                                                                                    <table border="0" cellpadding="0"
                                                                                        cellspacing="0"
                                                                                        role="presentation"
                                                                                        style="width:100%;"
                                                                                        width="100%">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td class="hlb-block-settings-content"
                                                                                                    style="background-color:#FFFFFF;vertical-align:top;padding-top:32px;padding-right:12px;padding-bottom:8px;padding-left:12px;">
                                                                                                    <table border="0"
                                                                                                        cellpadding="0"
                                                                                                        cellspacing="0"
                                                                                                        role="presentation"
                                                                                                        style=""
                                                                                                        width="100%">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td align="top"
                                                                                                                    class="kl-header-link-bar"
                                                                                                                    style="font-size:0px;padding:0px;word-break:break-word;">
                                                                                                                    <table
                                                                                                                        border="0"
                                                                                                                        cellpadding="0"
                                                                                                                        cellspacing="0"
                                                                                                                        style="color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;border:0;"
                                                                                                                        width="100%">
                                                                                                                        <tbody>
                                                                                                                            <tr>
                                                                                                                                <td align="center"
                                                                                                                                    class="hlb-logo"
                                                                                                                                    style="display:table-cell;width:100%;padding-bottom:10px;">
                                                                                                                                    <table
                                                                                                                                        border="0"
                                                                                                                                        cellpadding="0"
                                                                                                                                        cellspacing="0"
                                                                                                                                        style="border-collapse:collapse;border-spacing:0px;">
                                                                                                                                        <tbody>
                                                                                                                                            <tr>
                                                                                                                                                <td
                                                                                                                                                    style="width:160px;">
                                                                                                                                                </td>
                                                                                                                                            </tr>
                                                                                                                                        </tbody>
                                                                                                                                    </table>
                                                                                                                                </td>
                                                                                                                            </tr>
                                                                                                                        </tbody>
                                                                                                                    </table>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- HEADER IMAGE SECTION -->
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section" role="presentation"
                style="width:100%;">
                <tbody>
                    <tr>
                        <td>
                            <div style="margin:0px auto;max-width:600px;">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                    style="width:100%;">
                                    <tbody>
                                        <tr>
                                            <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
                                                <div
                                                    style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;max-width:600px;">
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                        role="presentation"
                                                        style="background:#FFFFFF;background-color:#FFFFFF;width:100%;">
                                                        <tbody>
                                                            <tr>
                                                                <td style="padding:0px;">
                                                                    <img
                                                                        src="https://parenting-insights.soul-sighted.com/email-deep-header.png"
                                                                        alt=""
                                                                        style="display:block;outline:none;text-decoration:none;height:auto;width:100%;"
                                                                        width="600" />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- MAIN CONTENT SECTION -->
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section" role="presentation"
                style="width:100%;">
                <tbody>
                    <tr>
                        <td>
                            <div style="margin:0px auto;max-width:600px;">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                    style="width:100%;">
                                    <tbody>
                                        <tr>
                                            <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
                                                <div
                                                    style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;max-width:600px;">
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                        role="presentation"
                                                        style="background:#FFFFFF;background-color:#FFFFFF;width:100%;">
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
                                                                    <div class="content-padding">
                                                                        <div class="kl-row colstack"
                                                                            style="display:table;table-layout:fixed;width:100%;">
                                                                            <div class="kl-column"
                                                                                style="display:table-cell;vertical-align:top;width:100%;">
                                                                                <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper"
                                                                                    style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
                                                                                    <table border="0" cellpadding="0"
                                                                                        cellspacing="0"
                                                                                        role="presentation"
                                                                                        style="width:100%;"
                                                                                        width="100%">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td class=""
                                                                                                    style="vertical-align:top;padding-top:9px;padding-right:0px;padding-bottom:9px;padding-left:0px;">
                                                                                                    <table border="0"
                                                                                                        cellpadding="0"
                                                                                                        cellspacing="0"
                                                                                                        role="presentation"
                                                                                                        style=""
                                                                                                        width="100%">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td align="left"
                                                                                                                    class="kl-text"
                                                                                                                    style="font-size:0px;padding:0px;word-break:break-word;">
                                                                                                                    <div
                                                                                                                        style="font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;color:#333333;">
                                                                                                                        ${html}
                                                                                                                    </div>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- BODY IMAGE SECTION -->
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section" role="presentation"
                style="width:100%;">
                <tbody>
                    <tr>
                        <td>
                            <div style="margin:0px auto;max-width:600px;">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                    style="width:100%;">
                                    <tbody>
                                        <tr>
                                            <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
                                                <div
                                                    style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;max-width:600px;">
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                        role="presentation"
                                                        style="background:#FFFFFF;background-color:#FFFFFF;width:100%;">
                                                        <tbody>
                                                            <tr>
                                                                <td style="padding:20px 18px;">
                                                                    <a href="https://soul-sighted.com/signin" target="_blank" style="text-decoration:none;display:block;">
                                                                        <img
                                                                            src="https://parenting-insights.soul-sighted.com/email-deep-body.png"
                                                                            alt=""
                                                                            style="display:block;outline:none;text-decoration:none;height:auto;width:100%;border-radius:8px;"
                                                                            width="564" />
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- FOOTER TEXT SECTION -->
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section" role="presentation"
                style="width:100%;">
                <tbody>
                    <tr>
                        <td>
                            <div style="margin:0px auto;max-width:600px;">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                    style="width:100%;">
                                    <tbody>
                                        <tr>
                                            <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
                                                <div
                                                    style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;max-width:600px;">
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                        role="presentation"
                                                        style="background:#FFFFFF;background-color:#FFFFFF;width:100%;">
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
                                                                    <div class="content-padding">
                                                                        <div class="kl-row colstack"
                                                                            style="display:table;table-layout:fixed;width:100%;">
                                                                            <div class="kl-column"
                                                                                style="display:table-cell;vertical-align:top;width:100%;">
                                                                                <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper"
                                                                                    style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
                                                                                    <table border="0" cellpadding="0"
                                                                                        cellspacing="0"
                                                                                        role="presentation"
                                                                                        style="width:100%;"
                                                                                        width="100%">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td class=""
                                                                                                    style="vertical-align:top;padding-top:20px;padding-right:0px;padding-bottom:9px;padding-left:0px;">
                                                                                                    <table border="0"
                                                                                                        cellpadding="0"
                                                                                                        cellspacing="0"
                                                                                                        role="presentation"
                                                                                                        style=""
                                                                                                        width="100%">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td align="left"
                                                                                                                    class="kl-text"
                                                                                                                    style="font-size:0px;padding:0px;word-break:break-word;">
                                                                                                                    <div
                                                                                                                        style="font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;color:#555555;">
                                                                                                                        <p>Your reading is also saved in your private portal here &rarr; <a href="https://parenting-insights.soul-sighted.com/signin" style="color:#000;text-decoration:underline;" target="_blank">Log In</a></p>
                                                                                                                        <p>I've loved mapping this with you.</p>
                                                                                                                        <p>Warmly,</p>
                                                                                                                        <img
                                                                                                                            src="https://parenting-insights.soul-sighted.com/email-logo.png"
                                                                                                                            alt="Soul Sighted"
                                                                                                                            style="display:block;outline:none;text-decoration:none;height:auto;width:160px;margin:10px 0;"
                                                                                                                            width="160" />
                                                                                                                        <p>Soul Sighted</p>
                                                                                                                        <p style="color:#888;font-size:13px;">
                                                                                                                            P.S. This work spreads quietly, from one conversation to the next.
                                                                                                                            If it felt meaningful, please tell a friend - it might also help her
                                                                                                                            find a little more ease.
                                                                                                                        </p>
                                                                                                                    </div>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- SOCIAL + FOOTER SECTION -->
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section" role="presentation"
                style="width:100%;">
                <tbody>
                    <tr>
                        <td>
                            <div style="margin:0px auto;max-width:600px;">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                    style="width:100%;">
                                    <tbody>
                                        <tr>
                                            <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
                                                <div
                                                    style="background:#FABD96;background-color:#FABD96;margin:0px auto;max-width:600px;">
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                        role="presentation"
                                                        style="background:#FABD96;background-color:#FABD96;width:100%;">
                                                        <tbody>
                                                            <tr>
                                                                <td style="padding:9px;text-align:center;">
                                                                    <div style="display:inline-block;padding-right:10px;">
                                                                        <a href="https://www.facebook.com/soulsighted.mama"
                                                                            style="color:#000; text-decoration:underline"
                                                                            target="_blank">
                                                                            <img alt="facebook"
                                                                                src="https://d3k81ch9hvuctc.cloudfront.net/assets/email/buttons/black/facebook_96.png"
                                                                                style="width:32px;"
                                                                                width="32" />
                                                                        </a>
                                                                    </div>
                                                                    <div style="display:inline-block;padding-right:10px;">
                                                                        <a href="https://www.instagram.com/soulsighted.mama/"
                                                                            style="color:#000; text-decoration:underline"
                                                                            target="_blank">
                                                                            <img alt="instagram"
                                                                                src="https://d3k81ch9hvuctc.cloudfront.net/assets/email/buttons/black/instagram_96.png"
                                                                                style="width:32px;"
                                                                                width="32" />
                                                                        </a>
                                                                    </div>
                                                                    <div style="display:inline-block;">
                                                                        <a href="https://www.youtube.com/@soulsighted"
                                                                            style="color:#000; text-decoration:underline"
                                                                            target="_blank">
                                                                            <img alt="YouTube"
                                                                                src="https://d3k81ch9hvuctc.cloudfront.net/assets/email/buttons/black/youtube_96.png"
                                                                                style="width:32px;"
                                                                                width="32" />
                                                                        </a>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding:9px 18px;text-align:center;">
                                                                    <div
                                                                        style="font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:12px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:center;color:#FFFFFF;">
                                                                        No longer want to receive these emails?
                                                                        <a href="#"
                                                                            style="color:#000; text-decoration:underline; font-family:Helvetica, Arial, sans-serif;">Unsubscribe</a>.
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>
</body>

</html>
  `
}
