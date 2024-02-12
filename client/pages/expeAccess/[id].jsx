import React from "react";
import SkillsEdit from "../edit/SkillsEdit";
import { useRouter } from "next/router";

export default function index() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <SkillsEdit id={id} />
    </div>
  );
}
