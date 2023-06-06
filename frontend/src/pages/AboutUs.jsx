import React from 'react'

const AboutUs = () => {
  return (
    <section className="bg-white dar  k:bg-gray-900">
    <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
      <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
        <h2 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">Welcome to our Laptop Store</h2>
        <p className="mb-4">We are your one-stop shop for all your laptop needs. Whether you're a student, professional, or gamer, we have the perfect laptop for you.</p>
        <p>Our team consists of knowledgeable experts who can help you find the ideal laptop based on your requirements and budget.</p>
      </div>
  
        <div className="grid grid-cols-2 gap-4 mt-8">
            <img className="w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" alt="office content 1" />
            <img className="mt-4 w-full lg:mt-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2" />
        </div>
    </div>
</section>  )
}

export default AboutUs