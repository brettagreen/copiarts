import Link from '@mui/material/Link';
import '../css/Footer.css';

/**
 * @component /frontend/src/components/Footer
 * @requires module:mui/material/Link
 * 
 * @description Footer component. used at the bottom of all pages. holds some relevant links and looks pretty
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * 
 * @returns {JSX.Element} - footer containing some images and some links
 *
 */
function Footer() {

    return (
        <footer className="footer">

            <div className="column" id="columnOne">
                <img width={25} src="/images/instagram_icon.png" alt="instagram social" />
                <span>Instagram</span>

                <img width={25} src="/images/tiktok_icon.png" alt="tik tok social" />
                <span style={{marginLeft: '-1.9em'}}>TikTok</span>
            </div>

            <div className="column" id="columnTwo">
                <Link sx={{display: 'block'}} href="/additional-information" underline='always' color="#f3f2f2">Contact Us</Link>
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


