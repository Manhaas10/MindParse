import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mail, Lock } from "lucide-react";
import { Brain } from "lucide-react";


const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        // TODO: Implement actual login logic
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex flex-col items-center">
                        <DialogTitle className="flex items-center justify-center gap-2 text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Welcome Back
                            <Brain className="h-8 w-8 text-blue-600" />
                        </DialogTitle>
                    </div>
                </DialogHeader>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Email
                            </Label>
                            <div className="relative mt-1">
                                <Mail className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                Password
                            </Label>
                            <div className="relative mt-1">
                                <Lock className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                        Sign In
                    </Button>
                </form>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <button
                            onClick={onSwitchToRegister}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Create one
                        </button>
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LoginModal;
