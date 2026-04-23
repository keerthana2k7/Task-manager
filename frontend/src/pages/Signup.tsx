import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mail, Lock, User, CheckSquare, ArrowRight } from "lucide-react";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

function getPasswordStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { score: 1, label: "Weak", color: "bg-priority-high" };
  if (score <= 3) return { score: 3, label: "Medium", color: "bg-priority-medium" };
  return { score: 5, label: "Strong", color: "bg-priority-low" };
}

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Must be at least 6 characters";
    if (password !== confirm) e.confirm = "Passwords don't match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setApiError("");
    try {
      await signup(name, email, password);
      navigate("/");
    } catch (err: any) {
      setApiError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const field = (
    id: string,
    label: string,
    icon: React.ReactNode,
    value: string,
    onChange: (v: string) => void,
    opts?: { type?: string; placeholder?: string; toggleShow?: boolean; show?: boolean; onToggle?: () => void }
  ) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>
        <Input
          id={id}
          type={opts?.toggleShow ? (opts.show ? "text" : "password") : (opts?.type || "text")}
          placeholder={opts?.placeholder || ""}
          className={cn(
            "pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20",
            opts?.toggleShow && "pr-10",
            errors[id] && "border-destructive focus:ring-destructive/20"
          )}
          value={value}
          onChange={(e) => { onChange(e.target.value); setErrors((p) => ({ ...p, [id]: "" })); }}
        />
        {opts?.toggleShow && (
          <button
            type="button"
            onClick={opts.onToggle}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {opts.show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
      {errors[id] && <p className="text-xs text-destructive animate-fade-in">{errors[id]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--auth-gradient-from)/0.12)] via-background to-[hsl(var(--auth-gradient-to)/0.08)]" />
      <div className="absolute top-[20%] -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-[10%] -right-32 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="absolute top-4 right-4 z-10">
        <ThemeSwitcher />
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary text-primary-foreground mb-4 shadow-lg shadow-primary/25">
            <CheckSquare className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-muted-foreground text-sm mt-1">Start managing your tasks today</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card rounded-2xl border shadow-xl shadow-primary/5 p-6 md:p-8 space-y-5 transition-all duration-300"
        >
          {field("name", "Full Name", <User className="h-4 w-4" />, name, setName, { placeholder: "John Doe" })}
          {field("email", "Email", <Mail className="h-4 w-4" />, email, setEmail, { placeholder: "you@example.com", type: "email" })}
          {field("password", "Password", <Lock className="h-4 w-4" />, password, setPassword, {
            placeholder: "••••••••",
            toggleShow: true,
            show: showPassword,
            onToggle: () => setShowPassword(!showPassword),
          })}

          {/* Password strength */}
          {password && (
            <div className="space-y-1.5 animate-fade-in">
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1.5 flex-1 rounded-full transition-all duration-300",
                      i <= strength.score ? strength.color : "bg-muted"
                    )}
                  />
                ))}
              </div>
              <p className={cn("text-xs font-medium", strength.color === "bg-priority-high" ? "text-priority-high" : strength.color === "bg-priority-medium" ? "text-priority-medium" : "text-priority-low")}>
                {strength.label} password
              </p>
            </div>
          )}

          {field("confirm", "Confirm Password", <Lock className="h-4 w-4" />, confirm, setConfirm, {
            placeholder: "••••••••",
            toggleShow: true,
            show: showConfirm,
            onToggle: () => setShowConfirm(!showConfirm),
          })}

          {apiError && (
            <p className="text-sm text-destructive text-center animate-fade-in">{apiError}</p>
          )}

          <Button
            type="submit"
            className="w-full h-11 font-medium transition-all duration-200 active:scale-[0.98] hover-scale"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Creating account...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Create Account
                <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
