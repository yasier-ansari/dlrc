import Accordion from '@/components/Accordion'
import AccordionContainer from "@/components/AccordionContainer"
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import HeroContainer from "@/components/HeroContainer"
import InfoContainer from "@/components/InfoContainer"
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import NormalText from "@/components/ui/normalText"
const About = () => {
	return (
		<div className='flex flex-col w-full min-h-screen  scroll-smooth'>
			<Header />
			<main className='flex min-h-screen relative w-full h-full '>
				<MaxWidthWrapper className=' flex flex-col px-6 sm:px-8 md:px-12 lg:px-20 justify-center mx-auto items-center max-w-7xl w-full h-full '>
					<HeroContainer />
					<InfoContainer
						title="Interested?"
					>
						<NormalText>
							Lorem ipsum, dolor sit amet consectetur adipisicing
							elit. Explicabo dolor recusandae, quos magni doloribus
							deserunt, aut amet officia repellat voluptas temporibus?
							Error ullam quae asperiores totam atque voluptatibus.
							Corporis, dolorum. Lorem ipsum, dolor sit amet
							consectetur adipisicing elit. Explicabo dolor
							recusandae, quos magni doloribus deserunt, aut amet
							officia repellat voluptas temporibus? Error ullam quae
							asperiores totam atque voluptatibus. Corporis, dolorum.
							Lorem ipsum, dolor sit amet consectetur adipisicing
							elit. Explicabo dolor recusandae, quos magni doloribus
							deserunt, aut amet officia repellat voluptas temporibus?
							Error ullam quae asperiores totam atque voluptatibus.
							Corporis, dolorum.
						</NormalText>
					</InfoContainer>
					<AccordionContainer />
				</MaxWidthWrapper>
			</main>
			<Footer />
		</div>
	)
}

export default About
