"use client";

import { useState } from "react";
import { CommunitiesGovernanceSettings, CommunitiesAesthetics } from "prisma-social";
import { Formik, Field, Form } from "formik";

interface Props {
  initialAesthetics: CommunitiesAesthetics;
  initialGovernanceSettings: CommunitiesGovernanceSettings;
  slug: string;
}

export function SettingsView(props: Props) {
  const { initialGovernanceSettings, initialAesthetics, slug } = props;
  const [governanceSettings, setGovernanceSettings] = useState(initialGovernanceSettings);
  const [aesthetics, setAesthetics] = useState(initialAesthetics);

  const updateGovernanceSettings = async (
    newGovernanceSettings: Partial<CommunitiesGovernanceSettings>
  ) => {
    // take in the new governanceSettings, merge it with the current one so nothing gets overwritten, and then update the database
    // await Community().update({
    //   where: { slug },
    //   data: {
    //     governanceSettings: {
    //       update: {
    //         ...governanceSettings,
    //         ...newGovernanceSettings,
    //       },
    //     },
    //   },
    // });
  };

  const updateAesthetics = async (newAesthetics: Partial<CommunitiesAesthetics>) => {
    // take in the new aesthetics, merge it with the current one so nothing gets overwritten, and then update the database
    // await Community().update({
    //   where: { slug },
    //   data: {
    //     aesthetics: {
    //       update: {
    //         ...aesthetics,
    //         ...newAesthetics,
    //       },
    //     },
    //   },
    // });
  };

  // We have two objects, aesthetics and governanceSettings, that we want to let them configure.
  // aesthetics: {
  //     palette: {
  //         darkPrimary: string?;
  //         lightPrimary: string?;
  //     }
  // }
  // governanceSettings: {
  //     entities: [
  //         {
  //             stage: "proposals" | "temp-check";
  //             entityId: string;
  //         }
  //     ]
  // }

  // Here are two forms, preloaded with initialSettings, and validated with yup so that any necessary fields are filled before clicking save.
  // The form is a controlled component, so the values are stored in state, and the state is updated when the user types.
  // When the user clicks save, the state is sent to the database.
  // Uses Formik
  return (
    <div className="flex w-[600px] max-w-full flex-col gap-4 p-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Governance Settings</h1>
        <p>These settings are used to configure the governance of your community.</p>
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold"> Aesthetics </h1>

        <Formik
          initialValues={aesthetics}
          onSubmit={async values => {
            await updateAesthetics(values);
          }}
        >
          {/* TODO: add labels in */}
          <Form className="flex flex-col gap-2">
            {/* here is a label: */}
            <label htmlFor="palette.darkPrimary">Dark Primary</label>
            <Field name="palette.darkPrimary" />
            <label htmlFor="palette.lightPrimary">Light Primary</label>
            <Field name="palette.lightPrimary" />
            <button className="w-[80px] rounded-lg  bg-white  hover:bg-[#CCCCCC]" type="submit">
              Save
            </button>
          </Form>
        </Formik>
        <div
          className="cursor-pointer  text-sm"
          onClick={() => {
            console.log(aesthetics);
          }}
        >
          see full aesthetics (console)
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold">Entities</h1>
        <Formik
          initialValues={governanceSettings}
          onSubmit={async values => {
            await updateGovernanceSettings(values);
          }}
        >
          <Form className="flex flex-col gap-2">
            <label htmlFor="entities[0].stage">Stage</label>
            <Field name="entities[0].stage" />
            <label htmlFor="entities[0].entityId">Entity ID</label>
            <Field name="entities[0].entityId" />
            <button className="w-[80px] rounded-lg bg-white hover:bg-[#CCCCCC]" type="submit">
              Save
            </button>
          </Form>
        </Formik>
        {/* dropdown that shows the full object if you expand it: */}
        <div
          className="cursor-pointer text-sm"
          onClick={() => {
            console.log(governanceSettings);
          }}
        >
          see full governance settings (console)
        </div>
      </div>
    </div>
  );
}
