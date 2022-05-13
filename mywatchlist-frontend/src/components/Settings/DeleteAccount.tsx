import { TrashIcon } from "@heroicons/react/solid";
import { Component } from "react";
import { JWTInfo } from "../../security/JWTContext";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { backendURL } from "../../Config";
import { Navigate } from "react-router";

interface DeleteAccountProps {
    jwtInfo: JWTInfo;
}

interface DeleteAccountState {
    isDeleted: boolean;
}

class DeleteAccount extends Component<DeleteAccountProps, DeleteAccountState> {
    constructor(props: DeleteAccountProps) {
        super(props);
        this.state = {
            isDeleted: false,
        };
    }

    async deleteAccount() {
        Swal.fire({
            icon: "error",
            title: "Do you really wanna delete your account?",
            showCancelButton: true,
            confirmButtonColor: "#E67082",
            cancelButtonColor: "#2E323C",
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                var responseStatus: number = 0;
                var responseText: string = "";
                await fetch(
                    backendURL +
                        "/user/deleteUser/" +
                        this.props.jwtInfo.username,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: "Bearer " + this.props.jwtInfo.jwt,
                        },
                    }
                )
                    .then((response) => {
                        responseStatus = response.status;
                        return response.json();
                    })
                    .then((data) => {
                        responseText = data.response;
                    });
                if (responseStatus === 200) {
                    toast.success(responseText);
                    this.setState({ isDeleted: true });
                } else toast.error(responseText);
            }
        });
    }

    render() {
        return (
            <div className="flex justify-center">
                {this.state.isDeleted ? (
                    <Navigate to="/logout" />
                ) : (
                    <button
                        onClick={() => {
                            this.deleteAccount();
                        }}
                        className="flex justify-between gap-2 rounded-md bg-white_bg dark:bg-dark_navbar  cursor-pointer p-4 drop-shadow dark:text-dark_text hover:dark:bg-card_dark"
                    >
                        <TrashIcon className="w-5" />
                        Delete Account
                    </button>
                )}
            </div>
        );
    }
}

export default DeleteAccount;
