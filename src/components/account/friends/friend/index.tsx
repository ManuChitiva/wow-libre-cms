import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import { getFriends } from "@/api/account/character";
import { Character, Friends } from "@/model/model";
import FriendDetail from "../detail";

interface CharacterProps {
  character: Character;
  token: string;
  accountId: number;
  serverId: number;
  t: (key: string, options?: any) => string;
}

const Friend: React.FC<CharacterProps> = ({
  character,
  token,
  accountId,
  serverId,
  t,
}) => {
  const [friendsModel, setFriends] = useState<Friends | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState<Character | null>();

  const openModal = (friend: Character) => {
    setSelectedFriendId(friend);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (character && token) {
          const response: Friends = await getFriends(
            token,
            character.id,
            accountId,
            serverId
          );
          setFriends(response);
        }
      } catch (error) {
        setFriends(null);
      }
    };

    fetchData();
  }, [character, selectedFriendId]);

  if (!character || character == null) {
    return <p> {t("friend-detail.errors.character-is-null")}</p>;
  }

  if (!friendsModel || friendsModel.friends.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <p className="text-white text-3x1 font-semibold mb-2">
          {t("friend-detail.errors.friend-is-empty")}
        </p>
        <p className="text-white text-xl">
          {t("friend-detail.errors.friend-is-empty-description")}
        </p>
      </div>
    );
  }

  const itemsPerPage = 3;
  const indexOfLastFriend = (currentPage + 1) * itemsPerPage;
  const indexOfFirstFriend = indexOfLastFriend - itemsPerPage;
  const currentFriends = friendsModel.friends.slice(
    indexOfFirstFriend,
    indexOfLastFriend
  );

  const handlePageClick = (data: { selected: number }) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  const onFriendDeleted = (friendId: number) => {
    if (friendsModel) {
      const updatedFriends = friendsModel.friends.filter(
        (friend) => friend.id !== friendId
      );
      setFriends({ ...friendsModel, friends: updatedFriends });
    }
  };
  return (
    <div className="p-4 ">
      <div className="text-center mx-auto mt-8 max-w-2xl">
        <h2 className="text-3xl font-semibold mt-4 mb-5 ml-2 text-orange-200">
          {t("friend-detail.title")}
        </h2>
      </div>

      <hr className="border-t-1 border-white my-4 mx-8" />

      <div className="grid grid-cols-3 gap-4 select-none">
        {currentFriends.map((friend) => (
          <div
            key={friend.id}
            className=" rounded-2xl shadow-2xl border border-gray-600 p-4 overflow-hidden cursor-pointer"
            onClick={() => openModal(friend)}
          >
            <img
              src={
                friend.race_logo
                  ? friend.race_logo
                  : "https://via.placeholder.com/50"
              }
              alt={`Avatar de ${friend.name}`}
              className="w-30 h-30 rounded-full mx-auto mb-2"
            />
            <div className="text-center">
              <h3 className="pt-2 text-3xl font-semibold text-orange-200">
                {friend.name}
              </h3>
            </div>
            <p className="text-orange-200  overflow-hidden overflow-ellipsis whitespace-nowrap">
              {t("friend-detail.nivel")}
              <span className="text-white">{friend.level}</span>
            </p>
            <p className="text-orange-200  overflow-hidden overflow-ellipsis whitespace-nowrap">
              {t("friend-detail.clase")}
              <span className="text-white">{friend.class}</span>
            </p>
            <p className="text-orange-200  overflow-hidden overflow-ellipsis whitespace-nowrap">
              {t("friend-detail.raza")}
              <span className="text-white">{friend.race}</span>
            </p>
            <p className="text-orange-200   overflow-hidden overflow-ellipsis whitespace-nowrap">
              {t("friend-detail.estado")}
              <span className="text-white">{friend.flags} </span>
            </p>
          </div>
        ))}
      </div>

      {isModalOpen && selectedFriendId != null && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-slate-200 rounded-2xl  p-3 relative">
              <button
                className="absolute top-0 right-0 mt-6 mr-6 action-button text-4xl text-white select-none"
                onClick={closeModal}
              >
                &#10005;
              </button>
              <FriendDetail
                jwt={token}
                accountId={accountId}
                character={character}
                serverId={serverId}
                friend={selectedFriendId}
                onCloseModal={closeModal}
                onFriendDeleted={onFriendDeleted}
                t={t}
              />
            </div>
          </div>
        </>
      )}

      <ReactPaginate
        forcePage={currentPage}
        previousLabel={t("friend-detail.btn.previous_label")}
        nextLabel={t("friend-detail.btn.next_label")}
        breakLabel={"..."}
        pageCount={Math.ceil(friendsModel.friends.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination flex justify-center mt-6"}
        pageClassName={"page-item inline-block mx-1"}
        pageLinkClassName={"page-link px-3 py-1 border-gray-300 rounded "}
        activeClassName={"active"}
        activeLinkClassName={"active-link  text-orange-200"}
        previousClassName={"inline-block mr-2"}
        previousLinkClassName={
          "previous-link px-3 py-1  border-gray-300 rounded text-white "
        }
        nextClassName={"inline-block ml-4"}
        nextLinkClassName={
          "next-link px-3 py-1  border-gray-300 rounded text-white "
        }
        breakClassName={"break-item"}
        breakLinkClassName={
          "break-link px-3 py-1 border border-gray-300 rounded text-gray-500"
        }
      />
    </div>
  );
};

export default Friend;
