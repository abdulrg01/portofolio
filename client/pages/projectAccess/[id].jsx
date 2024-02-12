import React from "react";
import ProjectEdit from "../edit/ProjectEdit";
import { useRouter } from "next/router";

export default function index() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <ProjectEdit id={id} />
    </div>
  );
}
