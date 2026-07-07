"use client";
import React from "react";
import * as _Builtin from "../devlink/_Builtin";
import * as _interactions from "../devlink/interactions";
import * as _utils from "../devlink/utils";
import _styles from "../devlink/OnboardingBirthdays.module.css";
import { useState, useEffect, useRef } from "react";
import { request } from "./env";
import { useFormDataFill } from "./useFormDataFill";
import "../app/autocomplete.css";

const _interactionsData = JSON.parse(
  '{"events":{"e":{"id":"e","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-3","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-66"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".faq_drop-wrapper","originalId":"6933f5f92112f48107e5dcc2|fcb78979-3ca5-79ec-9051-c856b0dbf8c4","appliesTo":"CLASS"},"targets":[{"selector":".faq_drop-wrapper","originalId":"6933f5f92112f48107e5dcc2|fcb78979-3ca5-79ec-9051-c856b0dbf8c4","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1765028675459},"e-2":{"id":"e-2","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-4","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-70"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".faq_drop-wrapper","originalId":"6933f5f92112f48107e5dcc2|fcb78979-3ca5-79ec-9051-c856b0dbf8c4","appliesTo":"CLASS"},"targets":[{"selector":".faq_drop-wrapper","originalId":"6933f5f92112f48107e5dcc2|fcb78979-3ca5-79ec-9051-c856b0dbf8c4","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1765028675460},"e-70":{"id":"e-70","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-21","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-66"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".faq_drop-wrapper","originalId":"695a4a423b1b9862c9aea283|fcb78979-3ca5-79ec-9051-c856b0dbf8c4","appliesTo":"CLASS"},"targets":[{"selector":".faq_drop-wrapper","originalId":"695a4a423b1b9862c9aea283|fcb78979-3ca5-79ec-9051-c856b0dbf8c4","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1765028675459},"e-66":{"id":"e-66","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-22","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-70"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".faq_drop-wrapper","originalId":"695a4a423b1b9862c9aea283|fcb78979-3ca5-79ec-9051-c856b0dbf8c4","appliesTo":"CLASS"},"targets":[{"selector":".faq_drop-wrapper","originalId":"695a4a423b1b9862c9aea283|fcb78979-3ca5-79ec-9051-c856b0dbf8c4","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1765028675460},"e-59":{"id":"e-59","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-64"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3307be2a-fd13-a4fd-871c-26884e3354f0","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3307be2a-fd13-a4fd-871c-26884e3354f0","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768210374414},"e-67":{"id":"e-67","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-65"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8f235b93-8039-5351-ca20-1723c4763a7a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8f235b93-8039-5351-ca20-1723c4763a7a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768210490694},"e-69":{"id":"e-69","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-84"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"14ee8eff-0908-fa2b-eeab-b102747d3365","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"14ee8eff-0908-fa2b-eeab-b102747d3365","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768212421520},"e-84":{"id":"e-84","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-69"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"14ee8eff-0908-fa2b-eeab-b102747d3365","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"14ee8eff-0908-fa2b-eeab-b102747d3365","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768212421521},"e-79":{"id":"e-79","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-50"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0cc645c0-da32-16d3-3b25-09320588e6e1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0cc645c0-da32-16d3-3b25-09320588e6e1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768304793348},"e-44":{"id":"e-44","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-72"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0cc645c0-da32-16d3-3b25-09320588e6db","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0cc645c0-da32-16d3-3b25-09320588e6db","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768304793348},"e-62":{"id":"e-62","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-52"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3eb1f1d9-95aa-5313-032d-1b88756a82bc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3eb1f1d9-95aa-5313-032d-1b88756a82bc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768204593623},"e-41":{"id":"e-41","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-75"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8f235b93-8039-5351-ca20-1723c4763a74","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8f235b93-8039-5351-ca20-1723c4763a74","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768210490694},"e-43":{"id":"e-43","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-80"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8f235b93-8039-5351-ca20-1723c4763a80","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8f235b93-8039-5351-ca20-1723c4763a80","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768210490694},"e-42":{"id":"e-42","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-82"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3eb1f1d9-95aa-5313-032d-1b88756a82d4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3eb1f1d9-95aa-5313-032d-1b88756a82d4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768209434784},"e-48":{"id":"e-48","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-51"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3307be2a-fd13-a4fd-871c-26884e3354f6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3307be2a-fd13-a4fd-871c-26884e3354f6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768210374414},"e-46":{"id":"e-46","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-56"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8f235b93-8039-5351-ca20-1723c4763a6e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8f235b93-8039-5351-ca20-1723c4763a6e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768210490694},"e-74":{"id":"e-74","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-77"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3eb1f1d9-95aa-5313-032d-1b88756a82b6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3eb1f1d9-95aa-5313-032d-1b88756a82b6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768204239774},"e-68":{"id":"e-68","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-83"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8f235b93-8039-5351-ca20-1723c4763a86","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8f235b93-8039-5351-ca20-1723c4763a86","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768210490694},"e-85":{"id":"e-85","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-45"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3eb1f1d9-95aa-5313-032d-1b88756a82c2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3eb1f1d9-95aa-5313-032d-1b88756a82c2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768204593384},"e-87":{"id":"e-87","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-73"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8f235b93-8039-5351-ca20-1723c4763a8c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8f235b93-8039-5351-ca20-1723c4763a8c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768210490694},"e-86":{"id":"e-86","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-49"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0cc645c0-da32-16d3-3b25-09320588e6e7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0cc645c0-da32-16d3-3b25-09320588e6e7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768304793348},"e-58":{"id":"e-58","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-60"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3307be2a-fd13-a4fd-871c-26884e3354e4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3307be2a-fd13-a4fd-871c-26884e3354e4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768210374414},"e-76":{"id":"e-76","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-78"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3eb1f1d9-95aa-5313-032d-1b88756a82ce","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3eb1f1d9-95aa-5313-032d-1b88756a82ce","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768209435321},"e-55":{"id":"e-55","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-81"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3307be2a-fd13-a4fd-871c-26884e3354de","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3307be2a-fd13-a4fd-871c-26884e3354de","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768210374414},"e-61":{"id":"e-61","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-57"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"14ee8eff-0908-fa2b-eeab-b102747d3340","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"14ee8eff-0908-fa2b-eeab-b102747d3340","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768210984140},"e-57":{"id":"e-57","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-61"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"14ee8eff-0908-fa2b-eeab-b102747d3340","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"14ee8eff-0908-fa2b-eeab-b102747d3340","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768210984140},"e-63":{"id":"e-63","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-71"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3eb1f1d9-95aa-5313-032d-1b88756a82c8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3eb1f1d9-95aa-5313-032d-1b88756a82c8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768209435896},"e-40":{"id":"e-40","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-53"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0cc645c0-da32-16d3-3b25-09320588e6ed","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0cc645c0-da32-16d3-3b25-09320588e6ed","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768304793348},"e-47":{"id":"e-47","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-54"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3307be2a-fd13-a4fd-871c-26884e3354ea","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3307be2a-fd13-a4fd-871c-26884e3354ea","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1768210374414}},"actionLists":{"a-3":{"id":"a-3","title":"Drop Open","actionItemGroups":[{"actionItems":[{"id":"a-3-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".drop_text-wrapper","selectorGuids":["d5275ba6-657c-9683-dfe9-2c7dc567efc5"]},"heightValue":0,"widthUnit":"AUTO","heightUnit":"px","locked":false}},{"id":"a-3-n-3","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-7","selectorGuids":["a17f6b2f-5531-f68d-f101-a48eabf1c5b3"]},"zValue":-90,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-3-n-4","actionTypeId":"STYLE_BORDER","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".drop_icon-wrapper","selectorGuids":["18d61156-da3a-271d-ebfe-dbb26c008dce"]},"globalSwatchId":"--white20","rValue":255,"bValue":255,"gValue":255,"aValue":0.2}}]},{"actionItems":[{"id":"a-3-n-5","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".drop_text-wrapper","selectorGuids":["d5275ba6-657c-9683-dfe9-2c7dc567efc5"]},"widthUnit":"AUTO","heightUnit":"AUTO","locked":false}},{"id":"a-3-n-7","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".image-7","selectorGuids":["a17f6b2f-5531-f68d-f101-a48eabf1c5b3"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-3-n-8","actionTypeId":"STYLE_BORDER","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".drop_icon-wrapper","selectorGuids":["18d61156-da3a-271d-ebfe-dbb26c008dce"]},"globalSwatchId":"--light-grey","rValue":218,"bValue":218,"gValue":218,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1765028679809},"a-4":{"id":"a-4","title":"Drop Close","actionItemGroups":[{"actionItems":[{"id":"a-4-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".drop_text-wrapper","selectorGuids":["d5275ba6-657c-9683-dfe9-2c7dc567efc5"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}},{"id":"a-4-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".image-7","selectorGuids":["a17f6b2f-5531-f68d-f101-a48eabf1c5b3"]},"zValue":-90,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-4-n-3","actionTypeId":"STYLE_BORDER","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".drop_icon-wrapper","selectorGuids":["18d61156-da3a-271d-ebfe-dbb26c008dce"]},"globalSwatchId":"--white20","rValue":255,"bValue":255,"gValue":255,"aValue":0.2}}]}],"useFirstGroupAsInitialState":false,"createdOn":1765028679809},"a-21":{"id":"a-21","title":"Drop Open 2","actionItemGroups":[{"actionItems":[{"id":"a-21-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".drop_text-wrapper","selectorGuids":["d5275ba6-657c-9683-dfe9-2c7dc567efc5"]},"heightValue":0,"widthUnit":"AUTO","heightUnit":"px","locked":false}},{"id":"a-21-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".image-7","selectorGuids":["a17f6b2f-5531-f68d-f101-a48eabf1c5b3"]},"zValue":-90,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-21-n-3","actionTypeId":"STYLE_BORDER","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".drop_icon-wrapper-2","selectorGuids":["959fa12d-e749-fbe9-f597-3836997d4ee8"]},"globalSwatchId":"--white20","rValue":255,"bValue":255,"gValue":255,"aValue":0.2}}]},{"actionItems":[{"id":"a-21-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".drop_text-wrapper","selectorGuids":["d5275ba6-657c-9683-dfe9-2c7dc567efc5"]},"widthUnit":"AUTO","heightUnit":"AUTO","locked":false}},{"id":"a-21-n-5","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".image-7","selectorGuids":["a17f6b2f-5531-f68d-f101-a48eabf1c5b3"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-21-n-6","actionTypeId":"STYLE_BORDER","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".drop_icon-wrapper-2","selectorGuids":["959fa12d-e749-fbe9-f597-3836997d4ee8"]},"globalSwatchId":"--light-grey","rValue":218,"bValue":218,"gValue":218,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1765028679809},"a-22":{"id":"a-22","title":"Drop Close 2","actionItemGroups":[{"actionItems":[{"id":"a-22-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".drop_text-wrapper","selectorGuids":["d5275ba6-657c-9683-dfe9-2c7dc567efc5"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}},{"id":"a-22-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".image-7","selectorGuids":["a17f6b2f-5531-f68d-f101-a48eabf1c5b3"]},"zValue":-90,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-22-n-3","actionTypeId":"STYLE_BORDER","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".drop_icon-wrapper-2","selectorGuids":["959fa12d-e749-fbe9-f597-3836997d4ee8"]},"globalSwatchId":"--white20","rValue":255,"bValue":255,"gValue":255,"aValue":0.2}}]}],"useFirstGroupAsInitialState":false,"createdOn":1765028679809},"a-23":{"id":"a-23","title":"radio dot","actionItemGroups":[{"actionItems":[{"id":"a-23-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".dot_color","selectorGuids":["959fa12d-e749-fbe9-f597-3836997d4ec5"]},"value":0,"unit":""}},{"id":"a-23-n-2","actionTypeId":"STYLE_BORDER","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".dot_first","selectorGuids":["959fa12d-e749-fbe9-f597-3836997d4ecc"]},"globalSwatchId":"","rValue":51,"bValue":51,"gValue":51,"aValue":0.4}}]},{"actionItems":[{"id":"a-23-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".dot_color","selectorGuids":["959fa12d-e749-fbe9-f597-3836997d4ec5"]},"value":1,"unit":""}},{"id":"a-23-n-4","actionTypeId":"STYLE_BORDER","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".dot_first","selectorGuids":["959fa12d-e749-fbe9-f597-3836997d4ecc"]},"globalSwatchId":"--coral","rValue":252,"bValue":151,"gValue":189,"aValue":1}}]}],"useFirstGroupAsInitialState":false,"createdOn":1768204243902},"a-19":{"id":"a-19","title":"radio dot birth","actionItemGroups":[{"actionItems":[{"id":"a-19-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".dot_color","selectorGuids":["959fa12d-e749-fbe9-f597-3836997d4ec5"]},"value":0,"unit":""}},{"id":"a-19-n-2","actionTypeId":"STYLE_BORDER","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".dot_first","selectorGuids":["959fa12d-e749-fbe9-f597-3836997d4ecc"]},"globalSwatchId":"","rValue":51,"bValue":51,"gValue":51,"aValue":0.4}}]},{"actionItems":[{"id":"a-19-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".dot_color","selectorGuids":["959fa12d-e749-fbe9-f597-3836997d4ec5"]},"value":1,"unit":""}},{"id":"a-19-n-4","actionTypeId":"STYLE_BORDER","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".dot_first","selectorGuids":["959fa12d-e749-fbe9-f597-3836997d4ecc"]},"globalSwatchId":"--coral","rValue":252,"bValue":151,"gValue":189,"aValue":1}}]}],"useFirstGroupAsInitialState":false,"createdOn":1768204243902},"a-20":{"id":"a-20","title":"radio dot birth off","actionItemGroups":[{"actionItems":[{"id":"a-20-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".dot_color","selectorGuids":["959fa12d-e749-fbe9-f597-3836997d4ec5"]},"value":0,"unit":""}},{"id":"a-20-n-2","actionTypeId":"STYLE_BORDER","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".dot_first","selectorGuids":["959fa12d-e749-fbe9-f597-3836997d4ecc"]},"globalSwatchId":"","rValue":51,"bValue":51,"gValue":51,"aValue":0.4}}]}],"useFirstGroupAsInitialState":false,"createdOn":1768204243902}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export default function PlacesAutocomplete({ name }) {
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
      <label htmlFor={name} className={_styles["text-block-5"]}>
        Select Place of birth
      </label>

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

export function OnboardingBirthdays({
  as: _Component = _Builtin.Block,
  title = "A little about when you both arrived…",
  image1 = "",
  image2 = "",

  link1 = {
    href: "#",
  },

  image3 = "/back-arrow.png",

  link2 = {
    href: "#",
  },
  formData = {},
  isParent, // User Relationsship type to render appropriate pronouns/ labels options
}) {
  _interactions.useInteractions(_interactionsData, _styles);
  useFormDataFill(formData);

  console.log(`Is Parent: ${isParent}`);
  return (
    <_Component
      className={_utils.cx(_styles, "padding-global", "padding-section-small")}
      tag="div"
      id="parent_birthplace_suggestions"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "container-large-5")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "onboarding_birth-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={`${_utils.cx(
              _styles,
              "margin-bottom",
              "margin-custom2"
            )} sf-title-margin`}
            tag="div"
          >
            <_Builtin.Heading
              className={_utils.cx(
                _styles,
                "onbording_heading",
                "padding_left"
              )}
              tag="h2"
            >
              {title}
            </_Builtin.Heading>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "onbording_content")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "birth_content-wrapper")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "parent_details-wrapper")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "margin-bottom",
                    "margin-custom1"
                  )}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "names_form-heading")}
                    tag="div"
                  >                    
                    {/* {isParent ? "Your details" : "Child details"}   */}
                    {"Your details"}  
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "margin-bottom",
                    "margin-custom1"
                  )}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "names_form-heading")}
                    tag="div"
                  >
                    <_Builtin.Span
                      className={_utils.cx(_styles, "span_italic")}
                    >
                      {""}
                    </_Builtin.Span>
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.FormWrapper
                  className={_utils.cx(_styles, "parent_form")}
                >
                  <_Builtin.FormForm
                    name="email-form-3"
                    data-name="Email Form 3"
                    method="get"
                    id="email-form-3"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "text-block-5")}
                      tag="div"
                    >
                      {"Enter your Date of Birth"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "input_form-wrapper")}
                      tag="div"
                    >
                      <_Builtin.FormTextInput
                        className={_utils.cx(_styles, "input_fild")}
                        name="parent_birth_date"
                        maxLength={256}
                        data-name="parent_birth_date"
                        placeholder="Pick your date of birth  "
                        disabled={false}
                        type="date"
                        required={true}
                        autoFocus={false}
                        id="parent_birth_date"
                      />
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "input_form-wrapper",
                        "radio"
                      )}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "text-block-5")}
                        tag="div"
                      >
                        {"Pick time of birth (optional)"}
                      </_Builtin.Block>
                      <_Builtin.FormTextInput
                        className={_utils.cx(_styles, "input_fild")}
                        name="parent_birth_time"
                        maxLength={256}
                        data-name="parent_birth_time"
                        placeholder="Time of birth"
                        disabled={false}
                        type="time"
                        required={false}
                        autoFocus={false}
                        id="parent_birth_time"
                      />
                    </_Builtin.Block>

                    {/* <_Builtin.FormRadioWrapper
                      className={_utils.cx(_styles, "reflection_radio-fild")}
                      data-w-id="14ee8eff-0908-fa2b-eeab-b102747d3340"
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
                        name="parent_brith_time_idk"
                        value="true"
                        data-name="parent_brith_time_idk"
                        required={false}
                        id="parent_brith_time_radio"
                        form={{
                          type: "radio-input",
                          name: "parent_brith_time_idk",
                        }}
                        inputType="default"
                      />
                      <_Builtin.FormInlineLabel
                        className={_utils.cx(
                          _styles,
                          "reflection_bnt-label",
                          "birth"
                        )}
                      >
                        {"I don't know"}
                      </_Builtin.FormInlineLabel>
                    </_Builtin.FormRadioWrapper> */}

                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "input_form-wrapper",
                        "last"
                      )}
                      tag="div"
                    >
                      <PlacesAutocomplete name="parent" />
                    </_Builtin.Block>
                    <_Builtin.FormButton
                      className={_utils.cx(_styles, "submit-button")}
                      type="submit"
                      value="Submit"
                      data-wait="Please wait..."
                    />
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
              <_Builtin.Block
                className={_utils.cx(_styles, "child_details-wrapper")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "margin-bottom",
                    "margin-custom1"
                  )}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "names_form-heading")}
                    tag="div"
                  >
                    {""}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "margin-bottom",
                    "margin-custom1"
                  )}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "names_form-heading")}
                    tag="div"
                    id="your-child"
                  >
                    
                    {`${isParent ? "Your child" : "Your Parent"}`}
                    
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.FormWrapper
                  className={_utils.cx(_styles, "parent_form")}
                >
                  <_Builtin.FormForm
                    name="email-form-3"
                    data-name="Email Form 3"
                    method="get"
                    id="email-form-3"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "text-block-5")}
                      tag="div"
                    >
                      {`Enter ${isParent ? "child's" : "parent's"} date of birth`}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "input_form-wrapper")}
                      tag="div"
                    >
                      <_Builtin.FormTextInput
                        className={_utils.cx(_styles, "input_fild")}
                        name="child_birth_date"
                        maxLength={256}
                        data-name="child_birth_date"
                        placeholder="Pick child's data of birth"
                        disabled={false}
                        type="date"
                        required={true}
                        autoFocus={false}
                        id="child_birth_date"
                      />
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "input_form-wrapper",
                        "radio"
                      )}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "text-block-5")}
                        tag="div"
                      >
                        {"Pick time of birth (optional)"}
                      </_Builtin.Block>
                      <_Builtin.FormTextInput
                        className={_utils.cx(_styles, "input_fild")}
                        name="child_birth_time"
                        maxLength={256}
                        data-name="child_birth_time"
                        placeholder="Time of birth"
                        disabled={false}
                        type="time"
                        required={false}
                        autoFocus={false}
                        id="child_birth_time"
                      />
                    </_Builtin.Block>

                    {/* <_Builtin.FormRadioWrapper
                      className={_utils.cx(_styles, "reflection_radio-fild")}
                      data-w-id="14ee8eff-0908-fa2b-eeab-b102747d3365"
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
                        name="child_birth_time_idk"
                        value="true"
                        data-name="child_birth_time_idk"
                        required={false}
                        id="child_birth_time_radio"
                        form={{
                          type: "radio-input",
                          name: "child_birth_time_idk",
                        }}
                        inputType="default"
                      />
                      <_Builtin.FormInlineLabel
                        className={_utils.cx(
                          _styles,
                          "reflection_bnt-label",
                          "birth"
                        )}
                      >
                        {"I don't know"}
                      </_Builtin.FormInlineLabel>
                    </_Builtin.FormRadioWrapper> */}

                    <_Builtin.Block
                      className={_utils.cx(_styles, "input_form-wrapper")}
                      tag="div"
                    >
                      <PlacesAutocomplete name="child" />
                    </_Builtin.Block>
                    <_Builtin.FormButton
                      className={_utils.cx(_styles, "submit-button")}
                      type="submit"
                      value="Submit"
                      data-wait="Please wait..."
                    />
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
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-7")}
                  tag="div"
                  id="child_birth_place_suggestions"
                />
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "onboarding_faq-wrapper")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "margin-bottom",
                  "margin-custom2",
                  "over-vis"
                )}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "faq_heading")}
                  tag="div"
                >
                  {"FAQ's"}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "drop_wrapper")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "faq_drop-wrapper", "onbord")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "drop_content", "onbord")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "drop_heading-wrapper")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "drop_heding",
                          "text-color-alternate",
                          "onbord"
                        )}
                        tag="div"
                      >
                        {"How accurate does my birth time need to be?"}
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "drop_text-wrapper")}
                      tag="div"
                    >
                      <_Builtin.Paragraph
                        className={_utils.cx(
                          _styles,
                          "paragraph",
                          "mob",
                          "onbord"
                        )}
                      >
                        {"If you know your exact birth time - great! "}
                        <br />
                        {
                          "If not, and you’re unsure within about 30 minutes either way, it’s better to just leave it blank. The Moon sign changes roughly every couple of days, and the Rising sign every couple of hours, but everything else on your birthday stays the same. "
                        }
                        <br />
                        {
                          "So even without an exact time, there’s still plenty of accuracy and insight to work with."
                        }
                      </_Builtin.Paragraph>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "drop_icon-wrapper-2",
                      "onbord"
                    )}
                    tag="div"
                  >
                    {/* <_Builtin.Image
                      className={_utils.cx(_styles, "image-7")}
                      width="auto"
                      height="auto"
                      loading="lazy"
                      alt=""
                      src={image1}
                    /> */}
                    <svg
                      className={_utils.cx(_styles, "image-7")}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "faq_drop-wrapper", "onbord")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "drop_content", "onbord")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "drop_heading-wrapper")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "drop_heding",
                          "text-color-alternate",
                          "onbord"
                        )}
                        tag="div"
                      >
                        {"What if I don’t know my birth time?"}
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "drop_text-wrapper")}
                      tag="div"
                    >
                      <_Builtin.Paragraph
                        className={_utils.cx(
                          _styles,
                          "paragraph",
                          "mob",
                          "onbord"
                        )}
                      >
                        {
                          "No stress - you can still receive a beautiful, highly accurate reading. "
                        }
                        <br />
                        {
                          "The Relationship Insight focuses on patterns and major planetary connections, which hardly shift during a single day."
                        }
                      </_Builtin.Paragraph>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "drop_icon-wrapper-2",
                      "onbord"
                    )}
                    tag="div"
                  >
                    <svg
                      className={_utils.cx(_styles, "image-7")}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "onbording_names-navigation")}
            tag="div"
          >
            <_Builtin.Link
              className={_utils.cx(_styles, "back_bnt")}
              button={false}
              id="onboarding_birth_back_btn"
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
                  src={image3}
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "back_text")}
                tag="div"
              >
                {"Back"}
              </_Builtin.Block>
            </_Builtin.Link>
            <_Builtin.Link
              className={_utils.cx(_styles, "btn-onboarding", "onbord")}
              button={true}
              id="onboarding_birth_btn"
              block=""
              options={link2}
            >
              {"Next"}
            </_Builtin.Link>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
