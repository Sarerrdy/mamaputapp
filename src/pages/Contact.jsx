import { useEffect } from "react";

function Contact() {
  useEffect(() => {
    document.title = "Contact";
  }, []);

  return (
    <div className="container min-h-screen h-full bg-body-secondary">
      <div className="container min-h-screen h-full mx-auto max-w-screen-lg">
        <div className="container min-h-screen h-full mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
          <div className="bg-white overflow-x-auto p-6 rounded-lg shadow-md mb-6">
            <div className="text-gray-900 text-7xl font-bold mb-8">
              Contact Us
            </div>
            <div className="text-gray-700 text-2xl leading-relaxed">
              <p className="mb-4">
                We would love to hear from you! Whether you have a question
                about our menu, services, or anything else, our team is ready to
                answer all your questions.
              </p>
              <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
              <p className="mb-4">
                Feel free to reach out to us through any of the following
                contact methods:
              </p>
              <h3 className="text-3xl font-bold mb-2">Email</h3>
              <p className="mb-4">
                You can email us at{" "}
                <a
                  href="mailto:sarerrdy4live@gmail.com"
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  sarerrdy4live@gmail.com
                </a>
                . We strive to respond to all emails within 24 hours.
              </p>
              <h3 className="text-3xl font-bold mb-2">Phone</h3>
              <p className="mb-4">
                Give us a call at{" "}
                <a
                  href="tel:+2347038745740"
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  +2347038745740
                </a>
                . Our phone lines are open from 9 AM to 9 PM, Monday to
                Saturday.
              </p>
              <h3 className="text-3xl font-bold mb-2">Address</h3>
              <p className="mb-4">
                Visit us at our location:
                <br />
                Peter Odili Road,
                <br />
                Portharcourt, Rivers State,
                <br />
                Nigeria
              </p>
              <h2 className="text-4xl font-bold mb-4">Follow Us</h2>
              <p className="mb-4">
                Stay connected with us on social media for the latest updates
                and promotions:
              </p>
              <ul className="list-disc list-inside mb-4">
                <li className="mb-2">
                  <a href="#" className="text-indigo-600 hover:text-indigo-500">
                    Facebook
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-indigo-600 hover:text-indigo-500">
                    Twitter
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-indigo-600 hover:text-indigo-500">
                    Instagram
                  </a>
                </li>
              </ul>
              <p className="mb-4">
                We look forward to hearing from you and serving you the best
                African cuisines!
              </p>
              <h2 className="text-4xl font-bold mb-4">Enquiry Form</h2>
              <form
                action="https://formspree.io/f/{your-form-id}"
                method="POST"
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xl font-medium text-gray-700"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 text-xl"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xl font-medium text-gray-700"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 text-xl"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xl font-medium text-gray-700"
                  >
                    Message:
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 text-xl"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-xl"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
