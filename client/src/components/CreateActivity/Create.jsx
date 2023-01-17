import React, { useMemo } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import CustomSelect from "./CustomSelect";
import styles from "./Create.module.css"

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLayoutEffect } from "react";
import { deepCleanUp, getAllCountries, postActivity } from "../../redux/actions";
import { IoRefreshOutline } from "react-icons/io5";
import Swal from 'sweetalert2'
const initialValues = {
  name: '',
  difficulty: '',
  duration: '',
  season: '',
  countries: []
};

const seasonOptions = [
  { label: "Autumn", value: "Autumn" },
  { label: "Spring", value: "Spring" },
  { label: "Summer", value: "Summer" },
  { label: "Winter", value: "Winter" },
];


const Create = () => {
  const dispatch = useDispatch()
  const allCountries = useSelector((state) => state.allCountries);

  useLayoutEffect(() => {
    !allCountries.length && dispatch(getAllCountries());
  }, [allCountries.length, dispatch]);

  const countriesOptions = useMemo(() => {
    return allCountries.slice().map((c) => ({ value: c.name, label: c.name }));
  }, [allCountries])

  const onSubmit = async (values, actions) => {
    try {
      await dispatch(postActivity({ ...values, difficulty: values.difficulty.toString()}));
      Swal.fire({
        position: 'center',
        font: 'Verdana',
        icon: 'success',
        title: 'Your activity was successfully created!',
        showConfirmButton: false,
        timer: 1800
      }).then(() => {
        dispatch(deepCleanUp())
        dispatch(getAllCountries())
        actions.resetForm()
        actions.setSubmitting(false);
      })
    } catch (error) {
      console.log("error", error.message)
    }
  };
  return (
    <div className={styles.container}>
      <Link to="/home">
        <button className={styles.btn_back}>BACK</button>
      </Link>
      <div className={styles.form_container}>
        <h3 className={styles.title}>Create activity</h3>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          {({ handleReset, dirty, isSubmitting, resetForm }) => (
            <Form autoComplete='off'>
              <div className={styles.property}>
                <label htmlFor="name" className={styles.name_property}>Name</label>
                <Field
                  className={styles.field}
                  name="name"
                  placeholder="Volley"
                  type="text"
                  required={true}
                  validate={(value) => {
                    if (!(value.toString()?.replace(/^\s+|\s+$/, "")).length) return "Please fill in this field."
                    if (value[0] === ' ') return "Please remove leading spaces."
                    if (value[value.length - 1] === ' ') return "Please remove trailing spaces."
                    if (!(/^[a-zA-Z0-9\u00C0-\u017F" "]{2,20}$/.test(value))) return "Name must contain 2 to 20 alphanumeric characters";
                    return;
                  }}
                />
                <ErrorMessage name="name" component="small" className={styles.field_error} />
              </div>

              <div className={styles.property}>
                <label htmlFor="countries" className={styles.name_property}>Countries</label>
                <Field
                  className="custom-select"
                  name="countries"
                  options={countriesOptions}
                  component={CustomSelect}
                  handleReset={handleReset}
                  placeholder="Select countries"
                  isMulti={true}
                  validate={(value) => {
                    if (!value.length) return "Please fill in this field."
                    if (value.length > 3) return "Select maximum 3 countries"
                    return;
                  }}
                />
                <ErrorMessage name="countries" component="small" className={styles.field_error} />
              </div>

              <div className={styles.property}>
                <label htmlFor="difficulty" className={styles.name_property}>Difficulty</label>
                <Field
                  className={styles.field}
                  name="difficulty"
                  required={true}
                  placeholder="1"
                  type="number"
                  min="1"
                  max="5"
                  validate={(value) => {
                    if (!(/^[0-9]$/.test(value)) || Number(value) > 5 || Number(value) < 1) {
                      return "Select a value from 1 to 5";
                    }
                    return;
                  }}
                />
                <ErrorMessage name="difficulty" component="small" className={styles.field_error} />
              </div>

              <div className={styles.property}>
                <label htmlFor="season" className={styles.name_property}>Season</label>
                <Field
                  className="custom-select"
                  name="season"
                  options={seasonOptions}
                  component={CustomSelect}
                  placeholder="Select a Season"
                  isMulti={false}
                  validate={(value) => {
                    if (!value.length) return "Please fill in this field."
                    return;
                  }}
                />
                <ErrorMessage name="season" component="small" className={styles.field_error} />
              </div>

              <div className={styles.property}>
                <label htmlFor="duration" className={styles.name_property}>Duration (Minutes)</label>
                <Field
                  className={styles.field}
                  name="duration"
                  placeholder="1"
                  type="number"
                  required={true}
                  min="1"
                  max="1440"
                  validate={(value) => {
                    if (!(/^[0-9]{1,4}$/.test(value)) || Number(value) > 1440 || Number(value) < 1) {
                      return "Select a value from 1 to 1440";
                    }
                    return;
                  }}
                />
                <ErrorMessage name="duration" component="small" className={styles.field_error} />
              </div>
              <div className={styles.btn_container}>
                <button type="submit" className={styles.submit_btn} disabled={!dirty}>Create</button>
                <button
                  className={styles.reset_btn}
                  type="button"
                  onClick={resetForm}
                  disabled={!dirty || isSubmitting}
                >
                  <IoRefreshOutline size='1.4em' />
                </button>
              </div>
            </Form>
          )}
        </Formik>

      </div>
    </div>
  )
};

export default Create;