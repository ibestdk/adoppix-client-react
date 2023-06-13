import SignUpCard from "../../../components/auth/signup/signup.component";

const SignUp = () => {
  return (
    <div className="dark:bg-adopdark bg-cover"
    style={{
      backgroundImage:
        "url(" +
        `https://cdn.discordapp.com/attachments/681151360305201169/1098674984769032303/kfEFCyBg-wallha.com.jpg` +
        ")",
    }}
    >
      <SignUpCard />
    </div>
  );
};

export default SignUp;
