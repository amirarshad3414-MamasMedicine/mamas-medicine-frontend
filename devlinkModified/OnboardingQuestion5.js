"use client";
import React from "react";
import * as _Builtin from "../devlink/_Builtin";
import * as _interactions from "../devlink/interactions";
import * as _utils from "../devlink/utils";
import _styles from "../devlink/OnboardingQuestion5.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-59":{"id":"e-59","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-64"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3307be2a-fd13-a4fd-871c-26884e3354f0","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3307be2a-fd13-a4fd-871c-26884e3354f0","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768210374414},"e-67":{"id":"e-67","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-65"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8f235b93-8039-5351-ca20-1723c4763a7a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8f235b93-8039-5351-ca20-1723c4763a7a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768210490694},"e-69":{"id":"e-69","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-84"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"14ee8eff-0908-fa2b-eeab-b102747d3365","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"14ee8eff-0908-fa2b-eeab-b102747d3365","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768212421520},"e-84":{"id":"e-84","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-69"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"14ee8eff-0908-fa2b-eeab-b102747d3365","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"14ee8eff-0908-fa2b-eeab-b102747d3365","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768212421521},"e-79":{"id":"e-79","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-50"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0cc645c0-da32-16d3-3b25-09320588e6e1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0cc645c0-da32-16d3-3b25-09320588e6e1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768304793348},"e-44":{"id":"e-44","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-72"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0cc645c0-da32-16d3-3b25-09320588e6db","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0cc645c0-da32-16d3-3b25-09320588e6db","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768304793348},"e-62":{"id":"e-62","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-52"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3eb1f1d9-95aa-5313-032d-1b88756a82bc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3eb1f1d9-95aa-5313-032d-1b88756a82bc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768204593623},"e-41":{"id":"e-41","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-75"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8f235b93-8039-5351-ca20-1723c4763a74","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8f235b93-8039-5351-ca20-1723c4763a74","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768210490694},"e-43":{"id":"e-43","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-80"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8f235b93-8039-5351-ca20-1723c4763a80","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8f235b93-8039-5351-ca20-1723c4763a80","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768210490694},"e-42":{"id":"e-42","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-82"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3eb1f1d9-95aa-5313-032d-1b88756a82d4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3eb1f1d9-95aa-5313-032d-1b88756a82d4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768209434784},"e-48":{"id":"e-48","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-51"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3307be2a-fd13-a4fd-871c-26884e3354f6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3307be2a-fd13-a4fd-871c-26884e3354f6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768210374414},"e-46":{"id":"e-46","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-56"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8f235b93-8039-5351-ca20-1723c4763a6e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8f235b93-8039-5351-ca20-1723c4763a6e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768210490694},"e-74":{"id":"e-74","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-77"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3eb1f1d9-95aa-5313-032d-1b88756a82b6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3eb1f1d9-95aa-5313-032d-1b88756a82b6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768204239774},"e-68":{"id":"e-68","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-83"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8f235b93-8039-5351-ca20-1723c4763a86","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8f235b93-8039-5351-ca20-1723c4763a86","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768210490694},"e-85":{"id":"e-85","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-45"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3eb1f1d9-95aa-5313-032d-1b88756a82c2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3eb1f1d9-95aa-5313-032d-1b88756a82c2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768204593384},"e-87":{"id":"e-87","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-73"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8f235b93-8039-5351-ca20-1723c4763a8c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8f235b93-8039-5351-ca20-1723c4763a8c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768210490694},"e-86":{"id":"e-86","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-49"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0cc645c0-da32-16d3-3b25-09320588e6e7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0cc645c0-da32-16d3-3b25-09320588e6e7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768304793348},"e-58":{"id":"e-58","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-60"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3307be2a-fd13-a4fd-871c-26884e3354e4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3307be2a-fd13-a4fd-871c-26884e3354e4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768210374414},"e-76":{"id":"e-76","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-78"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3eb1f1d9-95aa-5313-032d-1b88756a82ce","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3eb1f1d9-95aa-5313-032d-1b88756a82ce","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768209435321},"e-55":{"id":"e-55","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-81"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3307be2a-fd13-a4fd-871c-26884e3354de","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3307be2a-fd13-a4fd-871c-26884e3354de","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768210374414},"e-61":{"id":"e-61","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-57"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"14ee8eff-0908-fa2b-eeab-b102747d3340","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"14ee8eff-0908-fa2b-eeab-b102747d3340","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768210984140},"e-57":{"id":"e-57","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-61"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"14ee8eff-0908-fa2b-eeab-b102747d3340","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"14ee8eff-0908-fa2b-eeab-b102747d3340","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768210984140},"e-63":{"id":"e-63","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-71"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3eb1f1d9-95aa-5313-032d-1b88756a82c8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3eb1f1d9-95aa-5313-032d-1b88756a82c8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768209435896},"e-40":{"id":"e-40","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-53"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0cc645c0-da32-16d3-3b25-09320588e6ed","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0cc645c0-da32-16d3-3b25-09320588e6ed","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768304793348},"e-47":{"id":"e-47","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-54"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3307be2a-fd13-a4fd-871c-26884e3354ea","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3307be2a-fd13-a4fd-871c-26884e3354ea","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768210374414}},"actionLists":{"a-23":{"id":"a-23","title":"radio dot","actionItemGroups":[{"actionItems":[{"id":"a-23-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".dot_color","selectorGuids":["959fa12d-e749-fbe9-f597-3836997d4ec5"]},"value":0,"unit":""}},{"id":"a-23-n-2","actionTypeId":"STYLE_BORDER","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".dot_first","selectorGuids":["959fa12d-e749-fbe9-f597-3836997d4ecc"]},"globalSwatchId":"","rValue":51,"bValue":51,"gValue":51,"aValue":0.4}}]},{"actionItems":[{"id":"a-23-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".dot_color","selectorGuids":["959fa12d-e749-fbe9-f597-3836997d4ec5"]},"value":1,"unit":""}},{"id":"a-23-n-4","actionTypeId":"STYLE_BORDER","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".dot_first","selectorGuids":["959fa12d-e749-fbe9-f597-3836997d4ecc"]},"globalSwatchId":"--coral","rValue":252,"bValue":151,"gValue":189,"aValue":1}}]}],"useFirstGroupAsInitialState":false,"createdOn":1768204243902},"a-19":{"id":"a-19","title":"radio dot birth","actionItemGroups":[{"actionItems":[{"id":"a-19-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".dot_color","selectorGuids":["959fa12d-e749-fbe9-f597-3836997d4ec5"]},"value":0,"unit":""}},{"id":"a-19-n-2","actionTypeId":"STYLE_BORDER","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".dot_first","selectorGuids":["959fa12d-e749-fbe9-f597-3836997d4ecc"]},"globalSwatchId":"","rValue":51,"bValue":51,"gValue":51,"aValue":0.4}}]},{"actionItems":[{"id":"a-19-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".dot_color","selectorGuids":["959fa12d-e749-fbe9-f597-3836997d4ec5"]},"value":1,"unit":""}},{"id":"a-19-n-4","actionTypeId":"STYLE_BORDER","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".dot_first","selectorGuids":["959fa12d-e749-fbe9-f597-3836997d4ecc"]},"globalSwatchId":"--coral","rValue":252,"bValue":151,"gValue":189,"aValue":1}}]}],"useFirstGroupAsInitialState":false,"createdOn":1768204243902},"a-20":{"id":"a-20","title":"radio dot birth off","actionItemGroups":[{"actionItems":[{"id":"a-20-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".dot_color","selectorGuids":["959fa12d-e749-fbe9-f597-3836997d4ec5"]},"value":0,"unit":""}},{"id":"a-20-n-2","actionTypeId":"STYLE_BORDER","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".dot_first","selectorGuids":["959fa12d-e749-fbe9-f597-3836997d4ecc"]},"globalSwatchId":"","rValue":51,"bValue":51,"gValue":51,"aValue":0.4}}]}],"useFirstGroupAsInitialState":false,"createdOn":1768204243902}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function OnboardingQuestion5({
  as: _Component = _Builtin.Block,
  text1 = "Q4 of 4",
  text2 = "Which of these sounds most like you parenting this child?",

  link1 = {
    href: "#",
  },

  image = "/back-arrow.png",
  text3 = "Back",

  link2 = {
    href: "#",
  },

  text4 = "Next",
  isParent,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  const dynamicQuestionText2 = isParent 
    ? text2 
    : "When you look at your connection today, which of these sounds most like your parent's role in your life?"

  return (
    <_Component
      className={_utils.cx(_styles, "padding-global", "padding-section-medium")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "container-large-5")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "onboarding_reflection_2-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "progress_bar-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "step_text")}
              tag="div"
            >
              {text1}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "progress_bar", "step_number")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "progress_bar-step4")}
                tag="div"
              />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={`${_utils.cx(
              _styles,
              "margin-bottom",
              "margin-custom5"
            )} sf-title-margin`}
            tag="div"
          >
            <_Builtin.Block
              className={`${_utils.cx(
                _styles,
                "reflection_heading-text",
                "text-align-center"
              )} sf-heading-align`}
              tag="div"
            >
              {dynamicQuestionText2}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "reflection_form-wrapper")}
            tag="div"
          >
            <_Builtin.FormWrapper
              className={_utils.cx(_styles, "reflection_form")}
            >
              <_Builtin.FormForm
                className={_utils.cx(_styles, "form-2")}
                name="email-form-4"
                data-name="Email Form 4"
                method="get"
                id="email-form-4"
              >
                <_Builtin.FormButton
                  className={_utils.cx(_styles, "submit-button-4")}
                  type="submit"
                  value="Submit"
                  data-wait="Please wait..."
                />
                <_Builtin.FormRadioWrapper
                  className={_utils.cx(_styles, "reflection_radio-fild")}
                  data-w-id="8f235b93-8039-5351-ca20-1723c4763a6e"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "dot_first")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "dot_color")}
                      tag="div"
                    />
                  </_Builtin.Block>
                  <_Builtin.FormRadioInput
                    className={_utils.cx(_styles, "reflection_radio-bnt")}
                    type="radio"
                    name="Step4"
                    value="Their safe place"
                    data-name="Step4"
                    required={false}
                    id="radio-2"
                    form={{
                      type: "radio-input",
                      name: "Step4",
                    }}
                    inputType="default"
                  />
                  <_Builtin.FormInlineLabel
                    className={_utils.cx(_styles, "reflection_bnt-label")}
                  >
                    {isParent ? "Their safe place" : "Your safe place"}
                  </_Builtin.FormInlineLabel>
                </_Builtin.FormRadioWrapper>
                <_Builtin.FormRadioWrapper
                  className={_utils.cx(_styles, "reflection_radio-fild")}
                  data-w-id="8f235b93-8039-5351-ca20-1723c4763a74"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "dot_first")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "dot_color")}
                      tag="div"
                    />
                  </_Builtin.Block>
                  <_Builtin.FormRadioInput
                    className={_utils.cx(_styles, "reflection_radio-bnt")}
                    type="radio"
                    name="Step4"
                    value="Their guide"
                    data-name="Step4"
                    required={false}
                    id="radio-2"
                    form={{
                      type: "radio-input",
                      name: "Step4",
                    }}
                    inputType="default"
                  />
                  <_Builtin.FormInlineLabel
                    className={_utils.cx(_styles, "reflection_bnt-label")}
                  >
                    {isParent ? "Their guide" : "Your guide"}
                  </_Builtin.FormInlineLabel>
                </_Builtin.FormRadioWrapper>
                <_Builtin.FormRadioWrapper
                  className={_utils.cx(_styles, "reflection_radio-fild")}
                  data-w-id="8f235b93-8039-5351-ca20-1723c4763a7a"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "dot_first")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "dot_color")}
                      tag="div"
                    />
                  </_Builtin.Block>
                  <_Builtin.FormRadioInput
                    className={_utils.cx(_styles, "reflection_radio-bnt")}
                    type="radio"
                    name="Step4"
                    value="Their emotional support"
                    data-name="Step4"
                    required={false}
                    id="radio-2"
                    form={{
                      type: "radio-input",
                      name: "Step4",
                    }}
                    inputType="default"
                  />
                  <_Builtin.FormInlineLabel
                    className={_utils.cx(_styles, "reflection_bnt-label")}
                  >
                    {isParent ? "Their emotional support" : "Your emotional support"}
                  </_Builtin.FormInlineLabel>
                </_Builtin.FormRadioWrapper>
                <_Builtin.FormRadioWrapper
                  className={_utils.cx(_styles, "reflection_radio-fild")}
                  data-w-id="8f235b93-8039-5351-ca20-1723c4763a80"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "dot_first")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "dot_color")}
                      tag="div"
                    />
                  </_Builtin.Block>
                  <_Builtin.FormRadioInput
                    className={_utils.cx(_styles, "reflection_radio-bnt")}
                    type="radio"
                    name="Step4"
                    value="Their quiet cheerleader"
                    data-name="Step4"
                    required={false}
                    id="radio-2"
                    form={{
                      type: "radio-input",
                      name: "Step4",
                    }}
                    inputType="default"
                  />
                  <_Builtin.FormInlineLabel
                    className={_utils.cx(_styles, "reflection_bnt-label")}
                  >
                    {isParent ? "Their quiet cheerleader" : "Your quiet cheerleader"}
                  </_Builtin.FormInlineLabel>
                </_Builtin.FormRadioWrapper>
                <_Builtin.FormRadioWrapper
                  className={_utils.cx(_styles, "reflection_radio-fild")}
                  data-w-id="8f235b93-8039-5351-ca20-1723c4763a86"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "dot_first")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "dot_color")}
                      tag="div"
                    />
                  </_Builtin.Block>
                  <_Builtin.FormRadioInput
                    className={_utils.cx(_styles, "reflection_radio-bnt")}
                    type="radio"
                    name="Step4"
                    value="Their boundary-setter"
                    data-name="Step4"
                    required={false}
                    id="radio-2"
                    form={{
                      type: "radio-input",
                      name: "Step4",
                    }}
                    inputType="default"
                  />
                  <_Builtin.FormInlineLabel
                    className={_utils.cx(_styles, "reflection_bnt-label")}
                  >
                    {isParent ? "Their boundary-setter" : "Your boundary-setter"}
                  </_Builtin.FormInlineLabel>
                </_Builtin.FormRadioWrapper>
                <_Builtin.FormRadioWrapper
                  className={_utils.cx(_styles, "reflection_radio-fild")}
                  data-w-id="8f235b93-8039-5351-ca20-1723c4763a8c"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "dot_first")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "dot_color")}
                      tag="div"
                    />
                  </_Builtin.Block>
                  <_Builtin.FormRadioInput
                    className={_utils.cx(_styles, "reflection_radio-bnt")}
                    type="radio"
                    name="Step4"
                    value="It changes all the time"
                    data-name="Step4"
                    required={false}
                    id="radio-2"
                    form={{
                      type: "radio-input",
                      name: "Step4",
                    }}
                    inputType="default"
                  />
                  <_Builtin.FormInlineLabel
                    className={_utils.cx(_styles, "reflection_bnt-label")}
                  >
                    {"It changes all the time"}
                  </_Builtin.FormInlineLabel>
                </_Builtin.FormRadioWrapper>
              </_Builtin.FormForm>
              <_Builtin.FormSuccessMessage>
                <_Builtin.Block tag="div">
                  {"Thank you! Your submission has been received!"}
                </_Builtin.Block>
              </_Builtin.FormSuccessMessage>
              <_Builtin.FormErrorMessage>
                <_Builtin.Block tag="div">
                  {"Oops! Something went wrong while submitting the form."}
                </_Builtin.Block>
              </_Builtin.FormErrorMessage>
            </_Builtin.FormWrapper>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "onbording_names-navigation")}
          tag="div"
        >
          <_Builtin.Link
            className={_utils.cx(_styles, "back_bnt")}
            button={false}
            id="onboarding_reflection_5_back_btn"
            block="inline"
            options={link1}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "back_bnt-icon")}
              tag="div"
            >
              <_Builtin.Image
                className={_utils.cx(_styles, "icon_img")}
                width="auto"
                height="auto"
                loading="lazy"
                alt=""
                src={image}
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "back_text")}
              tag="div"
            >
              {text3}
            </_Builtin.Block>
          </_Builtin.Link>
          <_Builtin.Link
            className={_utils.cx(_styles, "btn-onboarding", "onbord")}
            button={true}
            id="onboarding_reflection_5_btn"
            block=""
            options={link2}
          >
            {text4}
          </_Builtin.Link>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
