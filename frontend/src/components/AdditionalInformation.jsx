import Link from '@mui/material/Link';
import Contact from './Contact'
import '../css/AdditionalInformation.css'

/**
 * @component /frontend/src/components/AdditionalInformation
 * @requires module:mui/material/Link
 * @requires module:/frontend/src/components/Contact

 * @description AdditionalInformation component. info on membership, peer support, and Community Agreement text
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * 
 * @returns {JSX.Element} - text document, some of it formatted. Also, feedback submission form.
 *
 */
function AdditionalInformation() {

	return(
		<div id="informationid">
			<section id="additionalText">
						
				<h2>INTERESTED IN JOINING US?</h2>
				<p >
					Membership is FREE of charge! <a href="mailto:cornucopia@copiarts.org">Email</a>, <a href="tel:+608-467-6646">call</a>
					&nbsp;or stop in and take a tour with us Monday-Friday 12:00-5:00 to learn more. 
				</p>

				<h3>Peer Support and Individual Skill Development</h3>
				<p>
					​We offer Individual Skills and Peer Support as part of
					&nbsp;
					<Link href="https://www.dcdhs.com/Behavioral-Health/Comprehensive-Community-Services" target="_blank" underline='always' color="#f3f2f2">
					Dane County's Comprehensive Community Services (CCS) program</Link>.
					&nbsp;
					Call Dane County's CCS intake at <a href="tel:+608-242-6415">608-242-6415</a> and ask for Cornucopia as your
					Service Provider! 
				</p>

				<h3>Community Agreement</h3>

				<p>
					Our Mission: Cornucopia Inc. is an arts and wellness center run by and for people in mental health and substance
					use recovery. We promote growth and dignity through self-directed recovery and peer support.
					At Cornucopia, we celebrate and value diversity, even while exploring the commonalities we share. We know
					there is strength in our diversity, and together we all achieve more than we can alone. Cornucopia does not
					discriminate against any protected class, and will provide reasonable accommodations to the known disabilities
					of any member, if needed, to participate in a program.
					As a community, we agree to three principles:
					<ul id="principleslist">
						<li><h3>Take care of yourself</h3></li>
							<ul>
								<li>
									Know when you need assistance, and ask for it as clearly as you can. Don’t be afraid to speak up for yourself.
									At Cornucopia, you must be independent in your basic needs. Cornucopia does not provide personal attendants.
								</li>
							</ul> 
						<li><h3>Take care of each other</h3></li>
							<ul>
								<li>
									Give assistance, if asked, or direct requests to a host, volunteer, or other resources if you are
									unable to help. Speak up for others if you see something wrong. Respect other people’s right to privacy and
									confidentiality. Do not do anything to or with another person without their consent.
									Any behavior that is disruptive or is verbally, physically, or emotionally threatening or abusive to
									anyone will not be tolerated, and may result in being asked to leave.
								</li>
							</ul>
						<li><h3>Take care of the space we share</h3></li>
							<ul>
								<li>
									Don’t waste supplies, use only what you need, and take responsibility to clean up.
									Help us maintain our space in good condition.
								</li>
							</ul>
					</ul>

					My signature shows I will do my part to maintain the Cornucopia community as a safe, clean, pleasant, and supportive environment.
					I understand that a failure to abide by any of the principles in this agreement may be grounds for being asked to leave the
					Cornucopia community.
				</p>
			</section>
			<section id="contactform">
				<Contact />
			</section>
		</div>
	)

}

export default AdditionalInformation;