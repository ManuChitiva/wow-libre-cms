"use client";
import { widgetSubscription } from "@/api/home";
import { getSubscriptionActive } from "@/api/subscriptions";
import LoadingSpinner from "@/components/utilities/loading-spinner";
import { useUserContext } from "@/context/UserContext";
import { PassAzerothData } from "@/model/model";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";

const Subscription = () => {
  const [subscriptionData, setSubscriptionData] = useState<PassAzerothData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [hasSubscription, setHasSubscription] = useState<boolean>(false);
  const { user } = useUserContext();
  const token = Cookies.get("token");

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        if (!token) {
          setHasSubscription(false);
        } else {
          const isActive = await getSubscriptionActive(token);
          setHasSubscription(isActive);
        }

        if (!hasSubscription) {
          const response = await widgetSubscription(user.language);
          setSubscriptionData(response);
        }
      } catch (err: any) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();
  }, [token, user.language]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-5">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || hasSubscription || !subscriptionData) {
    return null;
  }

  return (
    <div className="contenedor rounded-lg overflow-hidden mt-10 mb-20">
      <div className="max-w-9xl mx-auto">
        <div className="relative">
          <div className="bg-gradient-to-br pl-5 from-pink-600 to-indigo-900 rounded-t-lg py-6">
            <h2 className="text-3xl font-bold text-white text-left">
              {subscriptionData.title}
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-b-md p-6">
          <p className="text-lg text-gray-800 font-semibold text-left mb-6">
            {subscriptionData.description}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            {subscriptionData.benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="rounded-full h-36 w-36 overflow-hidden mx-auto mb-4">
                  <img
                    className="rounded-full h-full w-full object-cover"
                    src={benefit.img}
                    alt={benefit.alt}
                  />
                </div>
                <p className="font-semibold text-gray-600 text-xl">
                  {benefit.title}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-6">
            <Link
              href="#"
              className="bg-pink-600 text-white py-3 px-8 rounded-lg text-lg font-medium hover:bg-pink-700 transition-colors duration-300"
            >
              {subscriptionData.btn}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
