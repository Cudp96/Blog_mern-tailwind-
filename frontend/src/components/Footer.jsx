import { Footer } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaFacebook, FaInstagram } from "react-icons/fa";

const FooterComponent = () => {
  return (
    <Footer className="border border-t-8 border-teal-500" container>
      <div className=" w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <Link
            to={"/"}
            className="self-center mt-3 whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
          >
            <span className="px-2 py-1 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
              Sudeep's
            </span>
            Blog
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-3 sm:gap-6">
          <div className="">
            <Footer.Title title="About" />
            <Footer.LinkGroup col>
              <Footer.Link
                href="/about"
                target="_blank"
                rel="noopener noreferer"
              >
                About
              </Footer.Link>
              <Footer.Link
                href="https://sudeep96.netlify.app"
                target="_blank"
                rel="noopener noreferer"
              >
                Portfolio Website
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="Follow me" />
            <Footer.LinkGroup col>
              <Footer.Link
                href="https://sudeep96.netlify.app"
                target="_blank"
                className=" hover:text-gray-700"
              >
                Github
              </Footer.Link>
              <Footer.Link
                href="/about"
                target="_blank"
                className=" hover:text-pink-600"
              >
                Discord
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="Legal" />
            <Footer.LinkGroup col>
              <Footer.Link>Privacy Policy</Footer.Link>
              <Footer.Link>Term &amp; Conditions</Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex  sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Sudeep's Blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-2">
            <Footer.Icon
              icon={FaInstagram}
              className="h-6 w-6 hover:text-pink-600"
              href="#"
            />
            <Footer.Icon
              icon={FaFacebook}
              className="h-6 w-6 hover:text-blue-500"
              href="#"
            />
            <Footer.Icon
              icon={FaGithub}
              className="h-6 w-6 hover:text-gray-500"
              href="#"
            />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
