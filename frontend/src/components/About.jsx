import '../css/About.css'
import Link from '@mui/material/Link';

function About() {

	return (
		<aside id="aboutText">
			<h3>About Cornucopia</h3>
			<p>
				We are an arts and wellness center run for and by adult peers in mental health recovery and their allies. 
				We create original works of art and lasting positive relationships with one another. 
				Membership decreases isolation while it increases support, trust and hope in the process of recovery. 
			</p>
			<p> 
				We are also connected to <Link href="https://www.dcdhs.com/Behavioral-Health/Comprehensive-Community-Services" target="_blank" underline='always' color="#f3f2f2">
				Comprehensive Community Services (CCS)</Link> with
				<Link href="https://www.danecountyhumanservices.org" target="_blank" underline='always' color="#f3f2f2">Dane County's Department of Human Services</Link>. 
				Through CCS, clients of Cornucopia access <b>Peer Support</b> and/or <b>Individual Skills Development</b>. 
				Clients work on their goals of recovery. Clients' recovery goals are person-centered, holistic and set by the
				clients themselves.  
			</p>

			<h3>Our History</h3>
			<p>
				Cornucopia was incorporated in 1996 as a non-profit organization. Our slogan is: <blockquote>“a place to lead, a place to learn,
				a place to believe in ourselves.”</blockquote> Our founders include: Donna Murdoch, Kathleen King <del>(a local musician)</del>,
				Mary Moran and other peers. Cornucopia began one evening when the author of the book
				<Link href="https://www.goodreads.com/book/show/68783.Girl_Interrupted" target="_blank" underline="always" color="#f3f2f2">Girl Interrupted</Link>
				was doing a reading at a local Borders Book Store
				<del>about a patient's stay at Mclean’s psychiatric hospital in Boston</del>. At the same time, Donna was at the bookstore
				with Kathleen.
				While at the store, Donna said to Kathleen <q>“I want to introduce you to someone who has the same dream as you
				do—to establish a center
				in Madison for people with psychiatric challenges run by consumers.”</q> That’s when Donna met Mary Moran.
				From there, Donna, Kathleen, Mary and other peers began to put their ideas into practice.
			</p>
			<p>
 				The Peers began the center within MCVideo. The small group began to meet and focused on the arts.
				As time went by, several of them began to talk about how they could expand Cornucopia.
				Their idea was to make it into a much bigger organization with a larger space for artwork.
				The Peers began to feel they wanted to run their own organization. About ten of them met
				and started to brainstorm about how the new organization could become an activities center.
				They met three times before deciding they would incorporate on their own and apply for a grant.
			</p>
			<p>
 				During the summer of 1996, the peers met at the University of Wisconsin-Madison Union Terrace to write Cornucopia's mission.
				It was very difficult to find a place for the organization to rent. Their money was very limited.
				In addition, there was always stigma.
			</p>
			<p>	
 				The whole idea of the organization was that people outside of Community Support Programs lack support
				and have a lot of time on their hands. It’s hard to recover when one is isolated and doesn't spend any time
				in purposeful activity.
				Cornucopia provides social engagement and purpose through the arts and wellness.
			</p>
		</aside>
	)
}

export default About;