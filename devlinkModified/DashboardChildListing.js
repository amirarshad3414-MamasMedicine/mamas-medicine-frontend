"use client";
import React, { useRef, useState, useEffect } from "react";
import * as _Builtin from "../devlink/_Builtin";
import * as _utils from "../devlink/utils";
import _styles from "../devlink/DashboardChildListing.module.css";
import "../app/addChild.css";
import "../app/autocomplete.css";
import { request } from "./env";
import swal from "sweetalert";

function PlacesAutocomplete({ name, form, setForm }) {
  const [query, setQuery] = useState("");
  const [resultPlaceId, setResultPlaceId] = useState("");
  const [results, setResults] = useState([]);
  const resultClicked = useRef(false);

  useEffect(() => {
    if (resultClicked.current) return;
    if (!query) return;
    if (query < 4) {
      setResults([]);
      return;
    }

    request({
      method: "GET",
      endpoint: `/places_autocomplete?q=${query}`,
    }).then((data) => {
      console.log(data);
      setResults(data.predictions || []);
    });
  }, [query]);

  return (
    <div
      className="dropdown-input"
      style={{ position: "relative", width: "100%" }}
    >
      <input
        style={{ display: "none" }}
        value={resultPlaceId}
        name={name + "_place_id"}
        readOnly={true}
      />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Place of birth (city, country)"
        style={{ width: "100%", padding: "12px" }}
        name={name}
        onClick={() => (resultClicked.current = false)}
      />

      <div
        className="dropdown"
        style={{ border: !results?.length ? "none" : undefined }}
      >
        {results.map((item) => (
          <div
            key={item.place_id}
            onClick={() => {
              setQuery(item.description);
              setResultPlaceId(item.place_id);
              console.log(item);
              setForm({
                ...form,
                [name + "_place_id"]: item.place_id,
                [name]: item.description,
              });
              setResults([]);
              resultClicked.current = true;
            }}
            className="item"
          >
            {item.description}
          </div>
        ))}
      </div>
    </div>
  );
}

function AddChildModal({ isOpen, onClose, onSave, isParent }) {
  const [form, setForm] = useState({
    name: "",
  });

  // console.log("isParent", isParent);
  if (!isOpen) return <></>;

  const handleChange = (e) => {
    console.log("e.target.value", e);
    const key = e.target.name;
    setForm({
      ...form,
      [key]: e.target.value,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{isParent ? "Add another child" : "Add another Parent"}</h2>

        <label>{isParent ? "Child's Name" : "Parent's Name"}</label>
        <input
          name="name"
          placeholder={`Enter your ${isParent ? "child" : "parent"}'s name`}
          value={form.name}
          onChange={handleChange}
        />

        {/* <label>Birth Date</label>
        <input
          type="date"
          name="birthday"
          value={form.birthday}
          onChange={handleChange}
        />

        <label>Birth Time</label>
        <input
          type="time"
          name="birthtime"
          value={form.birthtime}
          onChange={handleChange}
        />

        <label>Select your pronouns</label>
        <select
          name="pronouns"
          value={form.pronouns}
          onChange={handleChange}
        >
          <option value="">Select Pronouns</option>
          <option value="he/him">He / Him</option>
          <option value="she/her">She / Her</option>
          <option value="they/them">They / Them</option>
          <option value="other">Other</option>
        </select>

        <label>Select Your Birthplace</label>
        <PlacesAutocomplete name="birthplace" form={form} setForm={setForm} /> */}

        <div className="modal-actions">
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
          <button className="save-btn" onClick={() => onSave(form)}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export function DashboardChildListing({
  as: _Component = _Builtin.Block,
  refreshData,
  setLoading,
  family = {},
  selectedChild = null,
  setSelectedChild = () => {},
  link = {
    href: "#",
  },

  
}) {
  const [isOpen, setIsOpen] = useState(false);

  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const userRelation = userData?.relationship_focus || "parent";
  const isParent = userRelation === "parent";
  // console.log("userRelation", userRelation)

  const text3 = isParent ? "+ Add another child" : "+ Add another Parent";

  return (
    <>
      <AddChildModal
        isOpen={isOpen}
        isParent={isParent}
        onClose={() => setIsOpen(false)}
        onSave={async (childData) => {
          if (!childData.name) {
            swal({
              title: "Error",
              text: isParent ? "Child name is required" : "Parent name is required",
              icon: "error",
            });
            return;
          }
          // Handle saving child data
          setLoading(true);
          setIsOpen(false);
          console.log("childData", childData);

          try {
            await request({
              method: "POST",
              endpoint: "add_children",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
              body: {
                name: childData.name,
                // dob: childData.birthday + "T" + (childData.birthtime || "00:00"),
                // place_of_birth: childData?.birthplace,
                // place_of_birth_id: childData.birthplace_place_id,
                // pronouns: childData.pronouns
              },
            });
            refreshData();
          } catch (e) {
            swal({
              title: "Error",
              text: e?.message || "Something went wrong",
              icon: "error",
            });
          }
        }}
      />
      <_Component
        className={_utils.cx(
          _styles,
          "padding-global-4",
          "padding-section-medium"
        )}
        tag="div"
        id="children-names-container"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "container-large-6")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "family_content-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "family_child-wrapper")}
              tag="div"
              id="children-container"
            >
              {Object.entries(family)
                .map(([_, v]) => v.child)
                .map((child) => (
                  <div
                    key={child?.id}
                    onClick={() => {
                      console.log("setSelectedChild(child?.id)", child);
                      setSelectedChild(child?.id);
                      localStorage.setItem("selectedChild", child?.id);
                    }}
                    className={_utils.cx(
                      _styles,
                      "family_child",
                      selectedChild == child?.id ? "is-active" : ""
                    )}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "child_name")}
                      tag="div"
                    >
                      {child?.name.length > 7
                        ? child.name.slice(0, 6) + "..."
                        : child?.name || "Unnamed Child"}
                    </_Builtin.Block>
                  </div>
                ))}
            </_Builtin.Block>
            <_Builtin.Link
              className={_utils.cx(_styles, "family_link")}
              button={false}
              id="add_child_link"
              block=""
              onClick={() => setIsOpen(true)}
              options={{ href: "#" }}
            >
              {text3}
            </_Builtin.Link>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Component>
    </>
  );
}
