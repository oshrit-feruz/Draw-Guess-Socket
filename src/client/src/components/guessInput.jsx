import { useForm } from "react-hook-form";

export default function GuessInput() {

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("word", { required: true, maxLength: 20 })} />
      <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
      <input type="number" {...register("age", { min: 18, max: 99 })} />
      <input type="submit" />
    </form>
  );
}