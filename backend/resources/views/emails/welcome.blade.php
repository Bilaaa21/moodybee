<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        /* Reset gaya dasar agar tidak berantakan di Outlook/Gmail */
        body { margin: 0; padding: 0; width: 100% !important; background-color: #ffffff; }
    </style>
</head>
<body>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center" style="padding: 20px;">
                <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #7CCC29; border-radius: 40px; overflow: hidden;">
                    <tr>
                        <td align="center" style="padding: 40px 20px;">
                            <h1 style="color: #ffffff; font-family: sans-serif; font-size: 28px; margin-bottom: 10px;">
                                Halo, {{ $user->username }}! 👋
                            </h1>
                            <p style="color: #ffffff; font-family: sans-serif; font-size: 16px; margin-bottom: 30px;">
                                Terima kasih sudah mendaftar di <strong>Moodybee</strong>.
                            </p>
                            
                            <table border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center" bgcolor="#ffffff" style="border-radius: 30px;">
                                        <a href="{{ $url }}" target="_blank" style="padding: 15px 40px; font-size: 18px; font-family: sans-serif; color: #FDB813; text-decoration: none; font-weight: bold; display: inline-block;">
                                            Verifikasi Akun
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>