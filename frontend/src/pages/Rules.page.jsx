import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import InfoContainer from "@/components/InfoContainer"
import InfoList from "@/components/InfoList"
import InfoListItems from "@/components/InfoListItems"
import RulesHeroSection from "@/components/RulesHeroSection"
import { rulesArray } from "@/lib/utils"
const Rules = () => {
	return (
		<div className='flex flex-col w-full min-h-screen bg-white scroll-mt-2 '>
			<Header />
			<main className='flex flex-col min-h-screen relative '>
				<MaxWidthWrapper className='flex-grow flex-1 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 flex-col justify-center mx-auto items-center max-w-6xl w-full h-full '>
					<RulesHeroSection />
					{
						rulesArray?.map((el, idx) => (
							<InfoContainer
								title={el?.title}
								key={idx}
							>
								<InfoList>
									{
										el?.ruleArray?.map((ele, idx) => (
											<InfoListItems key={idx} >
												{ele}
											</InfoListItems>
										))
									}
								</InfoList>
							</InfoContainer>
						))
					}
				</MaxWidthWrapper>
			</main>
			<Footer />
		</div>
	)
}

export default Rules
