import { Button } from "flowbite-react";
import React from "react";

const CallToAction = () => {
  return (
    <section className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl ">Want to learn more about JavaScript?</h2>
        <p className="text-gray-500 my-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
          tempora minus quia doloribus quos mollitia corrupti necessitatibus,
          laudantium sequi illum reprehenderit
        </p>
        <Button gradientDuoTone="purpleToPink">
          <a
            href="https://sudeep96.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-tl-xl rounded-bl-none"
          >
            Learn More
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1 ">
        <img
          src="https://img.freepik.com/free-vector/web-development-programmer-engineering-coding-website-augmented-reality-interface-screens-developer-project-engineer-programming-software-application-design-cartoon-illustration_107791-3863.jpg"
          alt=""
        />
      </div>
    </section>
  );
};

export default CallToAction;
