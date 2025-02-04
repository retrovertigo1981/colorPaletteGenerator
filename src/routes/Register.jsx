import { RegisterComponent } from "../components/RegisterComponent";
import { AnimatedGradientBackground } from "../components/AnimatedGradientBackground";
import { useIsMobile } from "../hooks/useIsMobile";

const Register = () => {
  const isMobile = useIsMobile();
  return (
    <>
      <div className="md:grid grid-cols-2">
        <div>
          <RegisterComponent />
        </div>
        <div>{!isMobile && <AnimatedGradientBackground />}</div>
      </div>
    </>
  );
};

export default Register;
