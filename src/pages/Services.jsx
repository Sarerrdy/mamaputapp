import { useEffect } from "react";

function Services() {
  useEffect(() => {
    document.title = "Services";
  }, []);

  return (
    <div className="container min-h-screen h-full bg-body-secondary">
      <div className="container min-h-screen h-full mx-auto max-w-screen-lg">
        <div className="container min-h-screen h-full mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
          <div className="bg-white overflow-x-auto p-6 rounded-lg shadow-md mb-6">
            <div className="text-gray-900 text-7xl font-bold mb-8">
              Services
            </div>
            <div className="text-gray-700 text-2xl leading-relaxed">
              <h2 className="text-4xl font-bold mb-4">Catering Services</h2>
              <p className="mb-4">
                At Mama Put, we offer exceptional catering services for both big
                and small events. Whether it's a corporate event, a school
                function, or a private party, our team is dedicated to providing
                delicious African cuisines that will leave your guests impressed
                and satisfied.
              </p>

              <h2 className="text-4xl font-bold mb-4">Home Services</h2>
              <p className="mb-4">
                We understand the comfort of enjoying a meal at home. That's why
                we offer home services where you can have our delicious dishes
                prepared and served right in the comfort of your home. Our
                professional chefs and staff ensure a delightful dining
                experience without you having to lift a finger.
              </p>

              <h2 className="text-4xl font-bold mb-4">
                Walk-In Restaurants and Cozy Food Trucks
              </h2>
              <p className="mb-4">
                Visit our walk-in restaurants and cozy food trucks to enjoy a
                variety of African dishes. Our restaurants provide a warm and
                welcoming atmosphere, perfect for family dinners, casual
                outings, or a quick bite. Our food trucks bring the taste of
                Africa to different locations, making it convenient for you to
                enjoy our meals on the go.
              </p>

              <h2 className="text-4xl font-bold mb-4">Home Deliveries</h2>
              <p className="mb-4">
                Craving African cuisine but don't want to leave the house? No
                problem! We offer home delivery services to bring your favorite
                dishes right to your doorstep. Our delivery team ensures that
                your food arrives hot and fresh, ready to be enjoyed.
              </p>

              <h2 className="text-4xl font-bold mb-4">Family Meals</h2>
              <p className="mb-4">
                We cater to families with our special family meal packages.
                Whether you're planning a family gathering or simply want to
                enjoy a hearty meal with your loved ones, our family meals are
                designed to provide a variety of dishes that everyone will love.
                Enjoy the taste of Africa with your entire family.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
