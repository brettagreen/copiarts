import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import '../css/Footer.css';

function Footer() {

    return (
        <footer className="footer">

            <div className="column" id="columnOne">
                <img width={25} src="/images/instagram_icon.png" alt="instagram social" /> Instagram

                <img width={25} src="/images/tiktok_icon.png" alt="tik tok social" /> TikTok
            </div>

            <div className="column" id="columnTwo">
                <Link sx={{display: 'block'}} href="/contact" underline='always' color="#f3f2f2">Contact Us</Link>
            </div>

            <div className="column">
                <address id="footerAddress">
                    Cornucopia Inc.<br />
                    &#9;South Ingersoll St.<br />
                    &#9;Madison WI 53703<br />
                    email: cornucopia@copiarts.org<br />
                    tel: 608-467-6646
                </address>
            </div>

        </footer>
    );
}

export default Footer;


