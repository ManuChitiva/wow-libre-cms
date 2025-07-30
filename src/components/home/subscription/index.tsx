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
    <div className="contenedor group relative mt-10 mb-1 rounded-2xl bg-gradient-to-br from-pink-600 to-indigo-900 transition-all duration-500">
      <div className="rounded-xl overflow-hidden bg-white transition-shadow duration-500 group-hover:shadow-[0_8px_20px_-4px_rgba(232,121,249,0.6)]">
        <div className="max-w-9xl mx-auto">
          {/* HEADER */}
          <div className="relative">
            <div className="bg-gradient-to-br pl-5 from-pink-600 to-indigo-900 rounded-t-lg py-6">
              <h2 className="text-3xl font-bold text-white text-left">
                {subscriptionData.title}
              </h2>
            </div>
          </div>

          {/* BODY */}
          <div className="rounded-b-md p-6 bg-white">
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

            {/* BOTÓN */}
            <div className="flex justify-end mt-6">
              <Link
                href="/subscriptions"
                className="group relative px-8 py-4 text-pink-100 border-2 border-pink-400 rounded-2xl font-bold tracking-wide bg-gradient-to-br from-pink-700 via-pink-600 to-purple-800 overflow-hidden transition duration-300 hover:text-white hover:border-pink-300 shadow-lg hover:shadow-pink-400/40"
              >
                {/* Luz expansiva desde el centro */}
                <span className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                  <span className="w-0 h-full bg-white/10 blur-md opacity-0 group-hover:opacity-100 group-hover:w-[120%] transition-all duration-500 rounded-full"></span>
                </span>

                {/* Rombos */}
                <span className="absolute left-0 top-1/2 -translate-y-[55%] -translate-x-1/2 w-3 h-3 border-2 border-pink-300 rotate-45 bg-white/20 z-10 transition duration-300 shadow-md group-hover:border-pink-200"></span>
                <span className="absolute right-0 top-1/2 -translate-y-[55%] translate-x-1/2 w-3 h-3 border-2 border-pink-300 rotate-45 bg-white/20 z-10 transition duration-300 shadow-md group-hover:border-pink-200"></span>

                <span className="relative z-10">{subscriptionData.btn}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Rombito inferior decorativo */}
      <span className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-4 h-4 rotate-45 border-2 border-pink-500 bg-white"></span>
    </div>
  );
};

export default Subscription;
