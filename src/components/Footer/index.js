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
        <section className="text-white body-font bg-[#cc43f5]">
          <h1 className="text-4xl sm:text-5xl font-bold text-5xl title-font mb5 text-center  text-[#000]  font-['Archivo']">
            FAQs
          </h1>
          <div className="container px-5 py-24 mx-auto text-center">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center p-4 rounded-lg">
                  <div className="flex-grow">
                    <h2 className="text-2xl font-medium title-font mb-12 text-center  text-[#000]  font-['Archivo']">
                      Will I be able to transfer my domain?
                    </h2>
                    <p className="leading-relaxed mb-6 font-['Poppins'] ">
                      Yes. Your domain is stored in your cryptocurrency wallet
                      and can be transferred by you after you mint the name on
                      the blockchain with your wallet.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center p-4 rounded-lg">
                  <div className="flex-grow">
                    <h2 className="text-2xl font-medium title-font mb-12 text-center  text-[#000]  font-['Archivo']">
                      How will I be able to view my NFT .LUV website?
                    </h2>
                    <p className="leading-relaxed mb-6 font-['Poppins'] ">
                      You will need to use a mirroring service, a browser
                      extension or a browser that supports NFT domains.{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center p-4 rounded-lg">
                  <div className="flex-grow">
                    <h2 className="text-2xl font-medium title-font mb-12 text-center  text-[#000]  font-['Archivo']">
                      Can I resell my .LUV domain name?
                    </h2>
                    <p className="leading-relaxed mb-6 font-['Poppins'] ">
                      Yes, you can resell your NFT LUV Name on any compatible
                      Polygon marketplace.{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center p-4 rounded-lg">
                  <div className="flex-grow">
                    <h2 className="text-2xl font-medium title-font mb-12 text-center  text-[#000]  font-['Archivo']">
                      Will I be able to search and find NFT domain websites on
                      Google or Bing?{" "}
                    </h2>
                    <p className="leading-relaxed mb-6 font-['Poppins'] ">
                      Major Web 2 search engines do not currently index NFT
                      domain websites.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center p-4 rounded-lg">
                  <div className="flex-grow">
                    <h2 className="text-2xl font-medium title-font mb-12 text-center  text-[#000]  font-['Archivo']">
                      Will there be some sort of ‘whois’ record of my personal
                      information associated to my domain?
                    </h2>
                    <p className="leading-relaxed mb-6 font-['Poppins'] ">
                      Not by default. Sharing ‘whois’ information is opt in i.e.
                      something that you can choose to do if you want.
                      Otherwise, your identity will not be publicly known.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-2 lg:w-1/3 md:w-1/2 w-full ">
                <div className="h-full flex items-center p-4 rounded-lg">
                  <div className="flex-grow">
                    <h2 className="text-2xl font-medium title-font mb-12   text-[#000]  font-['Archivo']">
                      How do trademarks work with NFT domains?
                    </h2>
                    <p className="leading-relaxed mb-6 font-['Poppins'] ">
                      Trademark holders with proof of ownership can apply to
                      claim ownership of trademarked names. If a trademark name
                      has already been sold, then it will be refunded. Note -
                      this process ends once domains have been distributed. LUV
                      Name Service does not have the ability to move a domain
                      once distribution has occurred.
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
