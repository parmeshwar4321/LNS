/* eslint-disable react/no-unescaped-entities */
import FooterImage from "../../assets/footer.png";
import twitterLogo from "../../assets/twitter-logo.svg";

// Constants
const TWITTER_HANDLE = "luvnft";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;


export default function Footer() {
  return (
    <div>
      <footer>
        <section className="text-white body-font bg-[#a470ff]">
          <h1 className="text-4xl font-medium title-font text-black mb-12 text-center">
            FAQs
          </h1>
          <div className="container px-5 py-24 mx-auto ">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center p-4 rounded-lg">
                  <div className="flex-grow">
                    <h2 className="text-2xl font-medium title-font text-black mb-12 text-center">
                    How much does this cost?
                    </h2>
                    <p className="leading-relaxed mb-6">
                    How much does this cost? All of our projects are free and open-source! You'll never need to pay for our guides, and we'll deploy on a testnet so your total cost for this whole thing will be $0.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center p-4 rounded-lg">
                  <div className="flex-grow">
                    <h2 className="text-2xl font-medium title-font text-black mb-12 text-center">
                    What's the time commitment?
                    </h2>
                    <p className="leading-relaxed mb-6">
                    The whole project will probably take you like 5-10 hours. Depends on your skill level. Most people finish it the same weekend it kicks off.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center p-4 rounded-lg">
                  <div className="flex-grow">
                    <h2 className="text-2xl font-medium title-font text-black mb-12 text-center">
                    Is this live or async?
                    </h2>
                    <p className="leading-relaxed mb-6 ">
                    It's all async! You can work on your project on your own time. All of the content will be available to you when you enrol and you'll have access to it forever :)
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center p-4 rounded-lg">
                  <div className="flex-grow">
                    <h2 className="text-2xl font-medium title-font text-black mb-12 text-center">
                    Are there guides I follow to build the project?                    </h2>
                    <p className="leading-relaxed mb-6">
                    If you're a dev curious about web3 -- this will be perfect. It helps if you have basic web dev experience!
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center p-4 rounded-lg">
                  <div className="flex-grow">
                    <h2 className="text-2xl font-medium title-font text-black mb-12 text-center">
                    What languages do I need to know for this?                    </h2>
                    <p className="leading-relaxed mb-6">
                    You just need to know some Javascript and the basics of React. Also, you should know the basics of running stuff inside a terminal. Basically, if you're familiar with the basics of web dev, you can do this for sure. If you don't, you'll struggle but you'll figure it out if you put in the work. We'll support you :).
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center p-4 rounded-lg">
                  <div className="flex-grow">
                    <h2 className="text-2xl font-medium title-font text-black mb-12 text-center">
                    Will I get an NFT for completing the project?                    </h2>
                    <p className="leading-relaxed mb-6">
                    Yes ser. Every successful completion of a buildspace project is rewarded with a unique NFT! Good luck.
                    </p>
                  </div>
                </div>
              </div>
              <div className="container mx-auto flex px-5 py-16 items-center justify-center flex-col">
              <img
                className="object-contain h-24 w-64"
                src={FooterImage?.src}
                alt="footer logo"
              />
              <img
                className="object-contain h-10 w-10 pointer-cursor"
                alt="Twitter Logo"
                src={twitterLogo?.src}
  
              />
              <a
                className="footer-text"
                href={TWITTER_LINK}
                target="_blank"
                rel="noreferrer"
              >{`built with @${TWITTER_HANDLE}`}</a>
            </div>
            </div>
            
          </div>
        </section>
      </footer>
    </div>
  );
}
