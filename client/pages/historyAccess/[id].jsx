import React from "react";
import { useRouter } from "next/router";
import HistEdit from "../edit/HistEdit";

export default function index() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <HistEdit id={id} />
    </div>
  );
}
