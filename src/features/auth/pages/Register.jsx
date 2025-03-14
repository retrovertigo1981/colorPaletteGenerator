import { RegisterForm } from "../components/RegisterForm";
import { AnimatedGradientBackground } from "../../../components/shared/AnimatedGradientBackground";
import { useIsMobile } from "../../../hooks/useIsMobile";

const Register = () => {
  const isMobile = useIsMobile();
  return (
    <>
      <div className="md:grid grid-cols-2">
        <div>
          <RegisterForm />
        </div>
        <div>{!isMobile && <AnimatedGradientBackground />}</div>
      </div>
    </>
  );
};

export default Register;
