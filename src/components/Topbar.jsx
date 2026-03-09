import React from "react";
import "./Topbar.css";

export default function Topbar({ page, profileImage }) {

const titles = {
overview:{title:"Dashboard Overview",sub:"Health summary"},
analytics:{title:"Health Analytics",sub:"Data insights"},
doctor:{title:"AI Doctor Assistant",sub:"Smart medical help"},
diet:{title:"Diet Planner",sub:"Daily nutrition plan"},
settings:{title:"Account Settings",sub:"Manage your profile"}
};

const data = titles[page] || titles.overview;

return(

<div className="header-box">

<div className="header-text">

<h1 className="page-heading">{data.title}</h1>

<p className="page-subtitle">{data.sub}</p>

</div>

<div className="profile">

<img src={profileImage || "/default.png"} alt="profile"/>

</div>

</div>

);

}