import React, { useEffect } from "react";
import { useForm } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import './Form.css';

type IputFormProps = {
  onSubmit?: (data: FieldValues) => void
}

/**
 * Component with form to enter first, last name and select or type topic
 * @param {IputFormProps} props - Component props with onSubmit handler 
 * @returns {JSX.Element}
 */
export default function InputForm(props: IputFormProps) {
  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    props.onSubmit?.(data);
  }

  const selectedTopic = watch("topic");

  useEffect(() => {
    if (selectedTopic === "other") {
      register("otherTopic");
    } else {
      unregister("otherTopic");
    }
  }, [register, unregister, selectedTopic]);

  return (
    <section className="form-container" data-testid="input-form">
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <label>
          First Name      
          <input            
            {
              ...register('firstName', {
                required: "First Name can not be empty",
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: "Only letters allowed",
                },
              })
            }
            aria-invalid={errors.firstName ? "true" : "false"}
            type="text"
            data-testid="firstName"
            autoFocus
          />
        </label>
        {errors.firstName && <span role="alert">{`${errors.firstName.message}`}</span>}
      </div>
      <div className="form-row">
        <label>
          Last Name
          <input            
            {
              ...register('lastName', {
                required: "Last Name can not be empty",
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: "Only letters allowed",
                },
              })
            }
            type="text"
            aria-invalid={errors.lastName ? "true" : "false"}
            data-testid="lastName"
          />
        </label>
        {errors.lastName && <span role="alert">{`${errors.lastName.message}`}</span>}
      </div>
      <div className="form-row">
      <label>
        Select topic
        <select {...register("topic")} data-testid="topic">
          <option value="travel">Travel</option>
          <option value="cars">Cars</option>
          <option value="wildlife">Wildlife</option>
          <option value="technology">Technology</option>
          <option value="other">Other</option>
        </select>        
      </label>
      </div>
      {selectedTopic === "other" && 
        <div className="form-row">
          <label>
            Provide topic
            <input            
              {
                ...register('otherTopic', {
                  required: "Topic can not be empty",
                  pattern: {
                    value: /^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/,
                    message: "Letters, digits and spaces between words allowed",
                  },
                })
              }
              type="text"
              aria-invalid={errors.otherTopic ? "true" : "false"}
              data-testid="otherTopic"
            />
          </label>
          {errors.otherTopic && <span role="alert">{`${errors.otherTopic.message}`}</span>}
        </div>
      }
      <button type="submit">Search!</button>
    </form>
    </section>
  )
}