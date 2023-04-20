import LoginCard from "../../../components/auth/login/login.component";

const SignIn = () => {
    return (
      <div className="dark:bg-adopdark  bg-cover"
      style={{
        backgroundImage:
          "url(" +
          `https://cdn.discordapp.com/attachments/681151360305201169/1098674984769032303/kfEFCyBg-wallha.com.jpg` +
          ")",
      }}
      >
       <LoginCard/>
      </div>
    );
  };
  
  export default SignIn;
  