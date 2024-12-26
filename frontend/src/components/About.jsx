import '../css/About.css';
import '../css/Events.css';
import Link from '@mui/material/Link';

/**
 * @component /frontend/src/components/About
 * @requires module:mui/material/Link
 * 
 * @description About component. mostly text, some of it formatted. Talks about history of Cornucopia.
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * 
 * @returns {JSX.Element} - formatted text going over Cornucopia and its history.
 *
 */
function About() {

	return (
		<div id="aboutid">
			<section id="aboutText">
				<h3>About Cornucopia</h3>
				<p>
					We are an arts and wellness center run for and by adult peers in mental health recovery and their allies. 
					We create original works of art and build lasting positive relationships with one another. 
					Membership decreases isolation while fosters support, trust, and hope in the process of recovery. 
				</p>
				<p> 
					We are also connected to <Link href="https://www.dcdhs.com/Behavioral-Health/Comprehensive-Community-Services" target="_blank" underline='always'>
					Comprehensive Community Services (CCS)</Link> with &nbsp;
					<Link href="https://www.danecountyhumanservices.org" target="_blank" underline='always'>Dane County's Department of Human Services</Link>. 
					Through CCS, clients of Cornucopia can access <b>Peer Support</b> and <b>Individual Skills Development</b>. 
					Clients work on their recovery goals. Clients' recovery goals are person-centered, holistic and set by the
					clients themselves.  
				</p>

				<h3>Our history and purpose</h3>
				<p>
					Cornucopia was incorporated in 1996 as a non-profit organization. Our slogan is:
				</p>
				<blockquote>
					“a place to lead, a place to learn, a place to believe in ourselves.”
				</blockquote> 
				<p>
					Our founders include Donna Murdoch, Kathleen King,
					Mary Moran, and other peers. One evening, the author of
					&nbsp;
					<Link href="https://www.goodreads.com/book/show/68783.Girl_Interrupted" target="_blank" underline="always">Girl Interrupted</Link>
					&nbsp;
					was doing a reading at a local Borders bookstore. Donna and Kathleen were in attendance.
					Donna said to Kathleen <q>I want to introduce you to someone who has the same dream as you
					do: to establish a center
					in Madison for people with psychiatric challenges run by consumers.</q> That’s when Kathleen met Mary Moran.
					From there, Donna, Kathleen, Mary and other peers began putting their ideas into practice.
				</p>
				<p>
					The Peers started Cornucopia within MCVideo.
					Soon enough, there were discussions about how they could expand Cornucopia
					into a bigger organization with a larger space for artwork.
					The Peers felt they wanted to run their own organization outside of MCVideo.
					They met three times before deciding they would incorporate on their own and apply for a grant.
				</p>
				<p>
					That summer, the peers met at the University of Wisconsin-Madison Union Terrace to write Cornucopia's
					mission statement. Despite challenges - difficulties finding a place for the organization to rent, limited finances, and 
					stigma around mental illness - they succeeded in getting Cornucopia up and running.
				</p>
				<p>	
					Cornucopia is founded on the idea that people outside of Community Support Programs can lack support
					and have too much time on their hands. It’s hard to recover when one is isolated and doesn't spend any time
					in purposeful activity. Cornucopia provides social engagement and purpose through the arts and wellness.
				</p>
			</section>
			<section id="aboutimages">
				<img src="https://picsum.photos/200" alt="homepage image" />
				<img src="https://picsum.photos/200" alt="homepage image" />
				<img src="https://picsum.photos/200" alt="homepage image" />
				<img src="https://picsum.photos/200" alt="homepage image" />
				<img src="https://picsum.photos/200" alt="homepage image" />
				<img src="https://picsum.photos/200" alt="homepage image" />
				<img src="https://picsum.photos/200" alt="homepage image" />
			</section>
			 
		</div>
	)
}

export default About;