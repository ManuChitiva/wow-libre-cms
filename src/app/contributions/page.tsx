"use client";
import SingleCard from "@/components/contributions/card";
import NavbarAuthenticated from "@/components/navbar-authenticated";
import Link from "next/link";

const Contributions = () => {
  const features = [
    {
      title: "World of Warcraft - Tradicional",
      description:
        "Revive la experiencia clásica con la versión 3.3.5a. ¡Explora Azeroth como en los viejos tiempos!",
      icon: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z",
      image:
        "https://wow.zamimg.com/uploads/blog/images/23049-the-burning-crusade-classic-beta-account-flagging-has-begun-check-your-battle.jpg",
      reverse: true,
      url: "https://www.mediafire.com/file/ucm0pcah89qc6lx/World_of_Warcraft_3.3.5a.rar/file",
      btnText: "Descargar Juego",
    },
    {
      title: "World of Warcraft - HD",
      description:
        "Disfruta de gráficos mejorados sin perder la esencia clásica de WoW 3.3.5a.",
      icon: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z",
      image: "https://i.imgur.com/8ae3ihU.png",
      reverse: false,
      url: "https://drive.usercontent.google.com/download?id=1jH5dirVKluY_L1kJwNicCd2A0ccjSvec&export=download&authuser=0",
      btnText: "Descargar Juego",
    },
  ];

  return (
    <div>
      <div className="contenedor">
        <NavbarAuthenticated />
      </div>

      <div
        className="text-white mb-20 mt-14"
        style={{
          background: "linear-gradient(110deg, #8e44ad, #2980b9)",
        }}
      >
        <div className="contenedor mx-auto px-6 py-12 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col justify-between max-w-2xl w-full">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-7">
                  ¿Listo para llevar tu experiencia al siguiente nivel?
                </h2>
                <p className="text-base sm:text-lg lg:text-2xl mb-4 break-words">
                  Lanza tu propio mundo, con total libertad y control. ¡Nos
                  encargamos de todo!
                </p>

                <p className="text-base sm:text-lg lg:text-2xl mb-4 break-words">
                  Servidores optimizados, estables y personalizados al 100% para
                  tu comunidad.
                </p>

                <p className="text-base sm:text-lg lg:text-2xl mb-4 break-words">
                  ¿Quieres algo único? Scripts exclusivos, eventos
                  personalizados y soporte completo.
                </p>

                <p className="text-base sm:text-lg lg:text-2xl mb-4 break-words font-semibold text-gray-200">
                  No más límites. Tu visión, tu reino.
                </p>
              </div>
              <div className="mt-8 sm:mt-10">
                <Link
                  href="https://chat.whatsapp.com/BDELJKhuJkWIMKxF8ExIdN"
                  target="_blank"
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold block text-center sm:inline-block"
                >
                  ¡Crea tu servidor ahora!
                </Link>
                <p className="text-lg pt-4 text-center sm:text-left break-words">
                  ¡Impulsa tu proyecto y conquista Azeroth con un servidor hecho
                  a tu medida!
                </p>
              </div>
            </div>
            {/* Ocultar imágenes en mobile y mostrarlas en sm+ */}
            <div className="hidden sm:grid sm:grid-cols-2 gap-4 lg:gap-8 items-center">
              <div className="relative h-[450px] w-full select-none">
                <img
                  src="https://static.wixstatic.com/media/5dd8a0_959a823b0b8048c0946db80638ec5291~mv2.webp"
                  alt="TrinityCore"
                  className="object-cover rounded-xl w-full h-full transition duration-300 hover:opacity-75"
                />
              </div>
              <div className="relative h-[450px] w-full select-none">
                <img
                  src="https://static.wixstatic.com/media/5dd8a0_8005afd12f6a43c8bda4ad2ed5a2bf92~mv2.jpg"
                  alt="AzerothCore"
                  className="object-cover rounded-xl w-full h-full transition duration-300 hover:opacity-75"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="contenedor  pb-10 pt-20 lg:pb-20 lg:pt-[10px]">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-20 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Proyectos<span className="sm:block"> De la comunidad</span>
          </h1>
        </div>
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <SingleCard
              image="https://static.wixstatic.com/media/5dd8a0_ee6badb1babc44caae9116919c469636~mv2.webp"
              CardTitle="Gestión y Conectividad en un Solo Lugar"
              titleHref="https://chat.whatsapp.com/BDELJKhuJkWIMKxF8ExIdN"
              btnHref="https://chat.whatsapp.com/BDELJKhuJkWIMKxF8ExIdN"
              CardDescription="Registra jugadores, administra tu servidor y conecta con WowLibre sin complicaciones. ¡Todo lo que necesitas en una sola plataforma!"
              Button="Adquirir"
            />
            <SingleCard
              image="https://static.wixstatic.com/media/5dd8a0_4cb670015f3d4b61838a98aa22aa6d98~mv2.jpg"
              CardTitle="Aplicación Móvil - Gestión de Jugadores"
              titleHref="https://chat.whatsapp.com/BDELJKhuJkWIMKxF8ExIdN"
              btnHref="https://chat.whatsapp.com/BDELJKhuJkWIMKxF8ExIdN"
              CardDescription="Administra las cuentas y estadísticas de tus jugadores desde cualquier lugar con nuestra intuitiva app móvil."
              Button="Adquirir"
            />
            <SingleCard
              image="https://static.wixstatic.com/media/5dd8a0_8c5b7a3a15014ad599ca7a0d6d6dfa35~mv2.jpg"
              CardTitle="Launcher Personalizado"
              titleHref="https://chat.whatsapp.com/BDELJKhuJkWIMKxF8ExIdN"
              btnHref="https://chat.whatsapp.com/BDELJKhuJkWIMKxF8ExIdN"
              CardDescription="Facilita a tus jugadores el acceso al servidor y gestiona actualizaciones con nuestro launcher diseñado para tu juego."
              Button="Adquirir"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="contenedor pt-15 pb-20 space-y-32 lg:space-y-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              Descargas &<span className="sm:block">Guias</span>
            </h1>
            <p className="text-white mx-auto max-w-xl sm:text-xl/relaxed">
              Accede a todos los recursos que necesitas para optimizar tu
              experiencia. Descarga clientes, herramientas y addons esenciales,
              y sigue nuestras guías detalladas para mejorar tu juego al máximo.
              ¡Domina Azeroth con el mejor contenido a tu alcance! 🚀🔥
            </p>
          </div>

          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-gray-900 lg:grid lg:max-w-9xl lg:grid-cols-2 lg:gap-32 lg:px-16 ${
                feature.reverse ? "lg:grid-flow-col-dense lg:col-start-2" : ""
              }`}
            >
              <div className="max-w-2xl px-4 lg:max-w-none lg:py-24">
                <div>
                  <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-pink-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-10 w-10 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={feature.icon}
                      />
                    </svg>
                  </span>
                  <h2 className="text-4xl font-bold tracking-tight text-white mt-8">
                    {feature.title}
                  </h2>
                  <p className="mt-6 text-xl text-gray-300">
                    {feature.description}
                  </p>
                  <div className="mt-8">
                    <a
                      target="_blank"
                      className="inline-flex rounded-lg bg-pink-600 px-6 py-2 text-lg font-semibold leading-7 text-white shadow-sm ring-1 ring-pink-600 hover:bg-pink-700 hover:ring-pink-700"
                      href={feature.url}
                    >
                      {feature.btnText}
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-10 sm:mt-20 lg:mt-0 flex justify-center">
                <img
                  className="max-w-full w-[90%] sm:w-full rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 mx-auto m-10"
                  src={feature.image}
                  alt={feature.title}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contributions;
