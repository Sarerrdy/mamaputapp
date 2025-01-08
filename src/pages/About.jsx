import { useEffect } from "react";

function About() {
  useEffect(() => {
    document.title = "About Us";
  }, []);

  return (
    <div className="container min-h-screen h-full bg-body-secondary">
      <div className="container min-h-screen h-full mx-auto max-w-screen-lg">
        <div className="container min-h-screen h-full mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
          <div className="bg-white overflow-x-auto p-6 rounded-lg shadow-md mb-6">
            <div className="text-gray-900 text-7xl font-bold mb-8">
              About Us
            </div>
            <div className="text-gray-700 text-2xl leading-relaxed">
              <p className="mb-4">
                Welcome to Mama Put, your number one source for authentic
                African cuisines. We are dedicated to providing you the very
                best of African dishes, with an emphasis on quality, taste, and
                customer satisfaction.
              </p>
              <p className="mb-4">
                Founded in 2023, Mama Put has come a long way from its
                beginnings. When we first started out, our passion for bringing
                the rich and diverse flavors of Africa to the world drove us to
                start our own restaurant web app.
              </p>
              <p className="mb-4">
                Our menu features a wide variety of dishes from different parts
                of Africa, including Jollof Rice, Pounded Yam with Egusi Soup,
                Suya, and many more. Each dish is prepared with the freshest
                ingredients and traditional cooking methods to ensure an
                authentic taste experience.
              </p>
              <p className="mb-4">
                We believe that food is not just about sustenance, but also
                about bringing people together and celebrating culture. That's
                why we strive to create a warm and welcoming environment for our
                customers, whether they are dining in or ordering online.
              </p>
              <p className="mb-4">
                We hope you enjoy our dishes as much as we enjoy offering them
                to you. If you have any questions or comments, please don't
                hesitate to contact us.
              </p>
              <p className="mb-4">
                Thank you for choosing Mama Put. We look forward to serving you!
              </p>
              <p className="font-bold text-2xl">Sincerely,</p>
              <p className="font-bold text-2xl">The Mama Put Team</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
