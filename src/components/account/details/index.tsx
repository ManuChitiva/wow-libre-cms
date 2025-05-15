"use client";
import {
  faCircleNotch,
  faComment,
  faCrown,
  faEnvelope,
  faFlag,
  faMedal,
  faMonument,
  faRotateLeft,
  faShieldHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import LoadingSpinner from "@/components/utilities/loading-spinner";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Swal from "sweetalert2";
import "./style.css";

import { getAccount, getUser } from "@/api/account";
import { getCharacters } from "@/api/account/character";
import DetailAccount from "@/components/account";
import Friend from "@/components/account/friends/friend";
import AccountGuild from "@/components/account/guild";
import Mails from "@/components/account/mails";
import CharacterSelection from "@/components/character_selection";
import SlotMachine from "@/components/machine/page";
import NavbarAuthenticated from "@/components/navbar-authenticated";
import Premium from "@/components/premium";
import Professions from "@/components/professions";
import Promotions from "@/components/promotions";
import ReturnToView from "@/components/utilities/returnToView";
import { useUserContext } from "@/context/UserContext";
import useAuth from "@/hook/useAuth";
import { AccountDetailDto, Character, UserDetailDto } from "@/model/model";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import Teleports from "@/components/teleports";

const AccountDetail = () => {
  const searchParams = useSearchParams();

  const token = Cookies.get("token")?.toString();
  const accountId = Number(searchParams.get("id"));
  const serverId = Number(searchParams.get("server_id"));

  const router = useRouter();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };
  const [isLoading, setIsLoading] = useState(true);
  const [accountDetail, setAccountDetail] = useState<AccountDetailDto>();
  const [userDetail, setUserDetail] = useState<UserDetailDto>();
  const [redirect, setRedirect] = useState(false);

  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character>();
  const [avatar, setAvatar] = useState(
    "https://static.wixstatic.com/media/5dd8a0_e662d30cd7314857b96fcdc3053e3244~mv2.webp"
  );
  const { t } = useTranslation();
  const { user } = useUserContext();

  useAuth(t("errors.message.expiration-session"));

  useEffect(() => {
    if (!token) {
      setRedirect(true);
    }

    const fetchData = async () => {
      try {
        if (accountId && token) {
          setIsLoading(true);

          const [charactersResponse, accountDetailResponse, userModel] =
            await Promise.all([
              getCharacters(token, accountId, serverId),
              getAccount(token, accountId, serverId),
              getUser(token),
            ]);

          setCharacters(charactersResponse.characters);
          setAccountDetail(accountDetailResponse);
          setUserDetail(userModel);
        } else {
          setRedirect(true);
        }
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.message}`,
          color: "white",
          background: "#0B1218",
          timer: 4500,
        });
        setRedirect(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [accountId, token, serverId]);

  if (redirect) {
    router.push("/accounts");
  }

  const handleSelectCharacter = (character: Character) => {
    setSelectedCharacter(character);
    setAvatar(character.race_logo);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen min-w-full">
        <div className="flex flex-col items-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="contenedor">
      <NavbarAuthenticated />

      <div className="flex flex-col items-center justify-center py-20 relative mt-20">
        <img
          src={avatar}
          alt="Default Avatar Image"
          className="w-36 h-36 rounded-full mb-4 box-shadow-primary"
        />
        <div className="text-center w-full max-w-md pt-2">
          <p className="text-4xl title-server">
            {accountDetail?.realm.split("").map((letter, index) => (
              <span key={index} className="text-white animate-color-cycle ">
                {letter}
              </span>
            ))}
          </p>
          <button
            onClick={togglePanel}
            className={`w-full py-2 px-4 rounded-lg flex items-center justify-center ${
              isPanelOpen ? "bg-transparent" : "bg-transparent"
            } text-white transition-colors duration-300`}
          >
            <span className="text-lg font-semibold">
              {isPanelOpen
                ? t("account-detail.hidden-menu")
                : t("account-detail.visible-menu")}
            </span>
            <FontAwesomeIcon
              icon={isPanelOpen ? faChevronUp : faChevronDown}
              className="text-xl ml-2"
            />
          </button>
          {isPanelOpen && userDetail && (
            <div className="mt-4  p-4 rounded-lg shadow-lg">
              <h2 className="text-white text-2xl font-bold">
                {t("account-detail.character.title")}
              </h2>
              <p className="text-white text-lg mt-2">
                <strong> {t("account-detail.character.name")}</strong>
                {userDetail?.first_name}
                {userDetail?.last_name}
              </p>
              <p className="text-white text-lg mt-2">
                <strong>{t("account-detail.character.email")}</strong>
                {accountDetail?.email}
              </p>
              <p className="text-white text-lg mt-2">
                <strong>{t("account-detail.character.country")}</strong>
                {userDetail?.country}
              </p>
              <p className="text-white text-lg mt-2">
                <strong>{t("account-detail.character.username")}</strong>
                {accountDetail?.username}
              </p>
            </div>
          )}
          <div className="mt-4">
            {!isLoading && characters.length > 0 ? (
              <CharacterSelection
                characters={characters}
                onSelectCharacter={handleSelectCharacter}
              />
            ) : (
              <div>
                <p className="text-white">
                  {t("account-detail.no-characters")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Secciones con pestañas */}
      <div className="mt-2  bg-profile eyelashes box-shadow-primary  overflow-hidden  ">
        <Tabs>
          <div className="flex flex-col lg:flex-row">
            {/* TabList para móviles (oculto en pantallas grandes) */}
            <TabList className=" flex flex-col border-b">
              <Tab className="py-6 px-6 text-white  bg-tablist cursor-pointer text-lg font-semibold flex items-center">
                <FontAwesomeIcon icon={faComment} className="mr-2 text-2xl" />
                {t("account-detail.tabs.var1")}
              </Tab>
              <Tab className="py-6 px-6 text-white bg-tablist  cursor-pointer text-lg font-semibold flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-2xl" />{" "}
                {t("account-detail.tabs.var2")}
              </Tab>
              <Tab className="py-6 px-6 text-white bg-tablist  cursor-pointer text-lg font-semibold flex items-center">
                <FontAwesomeIcon icon={faUser} className="mr-2 text-2xl" />{" "}
                {t("account-detail.tabs.var3")}
              </Tab>
              <Tab className="py-6 px-5 text-white  bg-tablist cursor-pointer text-lg font-semibold flex items-center">
                <FontAwesomeIcon
                  icon={faShieldHeart}
                  className="mr-2 text-2xl"
                />
                {t("account-detail.tabs.var4")}
              </Tab>
              <Tab className="py-6 px-5 text-white  bg-tablist cursor-pointer text-lg font-semibold flex items-center">
                <FontAwesomeIcon icon={faFlag} className="mr-2 text-2xl" />
                {t("account-detail.tabs.var5")}
              </Tab>
              <Tab className="py-6 px-5 text-white bg-tablist  cursor-pointer text-lg font-semibold flex items-center">
                <FontAwesomeIcon icon={faCrown} className="mr-2 text-2xl" />{" "}
                {t("account-detail.tabs.var6")}
              </Tab>
              <Tab className="py-6 px-5 text-white  bg-tablist cursor-pointer text-lg font-semibold flex items-center">
                <FontAwesomeIcon icon={faMedal} className="mr-2 text-2xl" />
                {t("account-detail.tabs.var7")}
              </Tab>
              <Tab className="py-6 px-5 text-white  bg-tablist cursor-pointer text-lg font-semibold flex items-center">
                <FontAwesomeIcon
                  icon={faCircleNotch}
                  className="mr-2 text-2xl"
                />
                {t("account-detail.tabs.var8")}
              </Tab>
              <Tab className="py-6 px-5 text-white  bg-tablist cursor-pointer text-lg font-semibold flex items-center">
                <FontAwesomeIcon icon={faMonument} className="mr-2 text-2xl" />
                {t("account-detail.tabs.var9")}
              </Tab>
              <Tab className="py-6 px-5 text-white  bg-tablist cursor-pointer text-lg font-semibold flex items-center">
                <FontAwesomeIcon
                  icon={faRotateLeft}
                  className="mr-2 text-2xl"
                />
                {t("account-detail.tabs.var10")}
              </Tab>
            </TabList>

            {/* Separadores verticales (ocultos en pantallas pequeñas) */}
            <div className="lg:border-l border-gray-300 hidden lg:block"></div>

            {/* Paneles de las pestañas */}
            <div className="w-full h-full flex-grow p-5 overflow-auto">
              <TabPanel>
                {/* Contenido de la pestaña Amigos */}
                {selectedCharacter && token && accountId ? (
                  <Friend
                    character={selectedCharacter}
                    token={token}
                    accountId={accountId}
                    serverId={serverId}
                    t={t}
                  />
                ) : (
                  <div className="p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-neon_green rounded-2xl shadow-2xl text-center border border-gray-700">
                    <h2 className="text-3xl font-extrabold mb-3 text-yellow-400 drop-shadow-lg">
                      {t("account-detail.character-no-select.friend.title")}
                    </h2>
                    <p className="text-xl text-gray-300 mb-4">
                      {t("account-detail.character-no-select.friend.subtitle")}
                    </p>
                    <p className="text-lg italic text-gray-400">
                      {t("account-detail.character-no-select.friend.text")}
                    </p>
                  </div>
                )}
              </TabPanel>
              <TabPanel>
                {/* Contenido de la pestaña Notificaciones */}
                {selectedCharacter && token && accountId ? (
                  <Mails
                    token={token}
                    characterId={selectedCharacter.id}
                    accountId={accountId}
                    serverId={serverId}
                    t={t}
                  />
                ) : (
                  <div className="p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-neon_green rounded-2xl shadow-2xl text-center border border-gray-700">
                    <h2 className="text-3xl font-extrabold mb-3 text-yellow-400 drop-shadow-lg">
                      {t("account-detail.character-no-select.mails.title")}
                    </h2>
                    <p className="text-xl text-gray-300 mb-4">
                      {t("account-detail.character-no-select.mails.subtitle")}
                    </p>
                    <p className="text-lg italic text-gray-400">
                      {t("account-detail.character-no-select.mails.text")}
                    </p>
                  </div>
                )}
              </TabPanel>
              <TabPanel>
                {/* Contenido de la pestaña Perfil Detallado */}
                {accountDetail && token && serverId ? (
                  <DetailAccount
                    account={accountDetail}
                    token={token}
                    serverId={serverId}
                    t={t}
                  />
                ) : null}
              </TabPanel>
              <TabPanel>
                {/* Contenido de la pestaña Profesiones */}
                {selectedCharacter && token && accountId && serverId ? (
                  <Professions
                    character={selectedCharacter}
                    token={token}
                    accountId={accountId}
                    serverId={serverId}
                    t={t}
                  />
                ) : (
                  <div className="p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-neon_green rounded-2xl shadow-2xl text-center border border-gray-700">
                    <h2 className="text-3xl font-extrabold mb-3 text-yellow-400 drop-shadow-lg">
                      {t(
                        "account-detail.character-no-select.professions.title"
                      )}
                    </h2>
                    <p className="text-xl text-gray-300 mb-4">
                      {t(
                        "account-detail.character-no-select.professions.subtitle"
                      )}
                    </p>
                    <p className="text-lg italic text-gray-400">
                      {t("account-detail.character-no-select.professions.text")}
                    </p>
                  </div>
                )}
              </TabPanel>
              <TabPanel>
                {selectedCharacter && token && accountId && user ? (
                  <AccountGuild
                    serverId={serverId}
                    characterId={selectedCharacter.id}
                    token={token}
                    accountId={accountId}
                    t={t}
                    language={user.language}
                  />
                ) : (
                  <div className="p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-neon_green rounded-2xl shadow-2xl text-center border border-gray-700">
                    <h2 className="text-3xl font-extrabold mb-3 text-yellow-400 drop-shadow-lg">
                      {t("account-detail.character-no-select.guilds.title")}
                    </h2>
                    <p className="text-xl text-gray-300 mb-4">
                      {t("account-detail.character-no-select.guilds.subtitle")}
                    </p>
                    <p className="text-lg italic text-gray-400">
                      {t("account-detail.character-no-select.guilds.text")}
                    </p>
                  </div>
                )}
              </TabPanel>
              <TabPanel>
                {token && selectedCharacter && serverId && accountId ? (
                  <Premium
                    serverId={serverId}
                    accountId={accountId}
                    characterId={selectedCharacter.id}
                    language={user.language}
                    token={token}
                    t={t}
                  />
                ) : (
                  <div className="p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-neon_green rounded-2xl shadow-2xl text-center border border-gray-700">
                    <h2 className="text-3xl font-extrabold mb-3 text-yellow-400 drop-shadow-lg">
                      {t("account-detail.character-no-select.premium.title")}
                    </h2>
                    <p className="text-xl text-gray-300 mb-4">
                      {t("account-detail.character-no-select.premium.subtitle")}
                    </p>
                    <p className="text-lg italic text-gray-400">
                      {t("account-detail.character-no-select.premium.text")}
                    </p>
                  </div>
                )}
              </TabPanel>
              <TabPanel>
                {token && selectedCharacter && serverId && accountId ? (
                  <Promotions
                    serverId={serverId}
                    accountId={accountId}
                    characterId={selectedCharacter.id}
                    language={user.language}
                    token={token}
                    classId={selectedCharacter.class_id}
                    t={t}
                  />
                ) : (
                  <div className="p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-neon_green rounded-2xl shadow-2xl text-center border border-gray-700">
                    <h2 className="text-3xl font-extrabold mb-3 text-yellow-400 drop-shadow-lg">
                      {t("account-detail.character-no-select.promotions.title")}
                    </h2>
                    <p className="text-xl text-gray-300 mb-4">
                      {t(
                        "account-detail.character-no-select.promotions.subtitle"
                      )}
                    </p>
                    <p className="text-lg italic text-gray-400">
                      {t("account-detail.character-no-select.promotions.text")}
                    </p>
                  </div>
                )}
              </TabPanel>
              <TabPanel>
                {token && selectedCharacter && serverId && accountId ? (
                  <SlotMachine
                    serverId={serverId}
                    accountId={accountId}
                    characterId={selectedCharacter.id}
                    language={user.language}
                    token={token}
                    t={t}
                  />
                ) : (
                  <div className="p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-neon_green rounded-2xl shadow-2xl text-center border border-gray-700">
                    <h2 className="text-3xl font-extrabold mb-3 text-yellow-400 drop-shadow-lg">
                      {t("account-detail.character-no-select.roulette.title")}
                    </h2>
                    <p className="text-xl text-gray-300 mb-4">
                      {t(
                        "account-detail.character-no-select.roulette.subtitle"
                      )}
                    </p>
                    <p className="text-lg italic text-gray-400">
                      {t("account-detail.character-no-select.roulette.text")}
                    </p>
                  </div>
                )}
              </TabPanel>
              <TabPanel>
                {token && selectedCharacter && serverId && accountId ? (
                  <Teleports
                    serverId={serverId}
                    raceId={selectedCharacter.race_id}
                    accountId={accountId}
                    characterId={selectedCharacter.id}
                    language={user.language}
                    token={token}
                    classId={selectedCharacter.class_id}
                    t={t}
                  />
                ) : (
                  <div className="p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-neon_green rounded-2xl shadow-2xl text-center border border-gray-700">
                    <h2 className="text-3xl font-extrabold mb-3 text-yellow-400 drop-shadow-lg">
                      {t("account-detail.character-no-select.teleport.title")}
                    </h2>
                    <p className="text-xl text-gray-300 mb-4">
                      {t(
                        "account-detail.character-no-select.teleport.subtitle"
                      )}
                    </p>
                    <p className="text-lg italic text-gray-400">
                      {t("account-detail.character-no-select.teleport.text")}
                    </p>
                  </div>
                )}
              </TabPanel>
              <TabPanel>
                <ReturnToView />
              </TabPanel>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default AccountDetail;
