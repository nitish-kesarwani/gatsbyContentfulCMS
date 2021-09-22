import * as React from "react"
import {useState, useEffect} from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faAngleDown
} from '@fortawesome/free-solid-svg-icons'


const Header = ({ siteTitle }) => {	

	return (
		<>
			<header
				style={{
					background: `#00375e`,
					padding:'0.7rem'
				}}
			>
				<div style={{textAlign:'center'}}>
					<span style={{color:'#fff'}}>Get your copy of the</span>
					<span style={{color:'#55a4da'}}>&nbsp;
						2020 Gartner Market Guide for Digital Asset Management
					</span>
					<span className='accessBtn'>Access Now</span>
				</div>
			</header>
			<FixHeader/>
		</>
	)
}

const FixHeader = () => {
	
	const [fix, setstate] = useState(false)
	useEffect(() => {
		window.addEventListener("scroll", () => {
			if(window?.scrollY > 52){
				setstate(true)
			}else{
				setstate(false)
			}
		});
	}, []); 
	
	return(
		<div className={`${fix ? 'fix fixHeader' : 'fixHeader'}`}>
			<div style={{maxWidth:1140, margin:'auto', display:'flex', alignItems:'center'}}>
				<Link to='/'>
					<StaticImage
						src="../images/logo.png"
						width={252}
						quality={95}
						formats={["auto", "webp", "avif"]}
						alt="MediaValet logo"
					/>
				</Link>
				<nav className='navBar'>
					<Link style={{cursor:'pointer'}} to='/blog'>
						Blogs
					</Link>
					<a href="/html/">Products <FontAwesomeIcon icon={faAngleDown} size="1x" /></a>
					{/* <a href="/css/">Solutions <FontAwesomeIcon icon={faAngleDown} size="1x" /></a> */}
					<a href="/js/">Resources <FontAwesomeIcon icon={faAngleDown} size="1x" /></a>
					<a href="/python/">Partners <FontAwesomeIcon icon={faAngleDown} size="1x" /></a>
					<a href="/python/">About Us <FontAwesomeIcon icon={faAngleDown} size="1x" /></a>
				</nav>
				<span className='accessBtn'>Contact Us</span>
				<span className='accessBtn success'>Get Free Demo</span>
			</div>
		</div>
	)
}

Header.propTypes = {
	siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
