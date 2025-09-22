"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { setUser } from "@/store/features/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard({ user }) {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const reduxUser = useSelector((state) => state.user);
  console.log(user);
  // Hydrate Redux with server user on mount
  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [user, dispatch]);

  // Keep Redux in sync with live session
  useEffect(() => {
    if (session?.user) {
      dispatch(setUser(session.user));
    }
  }, [session, dispatch]);

  return (
    <div>
      Dashboard {reduxUser?.name} ({reduxUser?.email})
    </div>
  );
}
