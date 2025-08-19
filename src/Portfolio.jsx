import React, { useState, useEffect } from 'react';
import { ChevronDown, Mail, Code, Shield, Zap, Users, CheckCircle, ArrowRight, Menu, Sun, Moon, X } from 'lucide-react';
import image from './assets/Lanre.jpg';
import { toast } from 'sonner'
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import {  FaXTwitter } from 'react-icons/fa6';

const Portfolio = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    
    
    const myemail ='odesanyalanre3@gmail.com';
    const myname ='Lanre Odesanya'
    const acronym ='LO'
    
    
      
    const handleSubmit = (e, preferredMethod = null) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
        toast.error('Please fill in all fields');
        return;
    }

    // Enhanced device detection
    const getDeviceInfo = () => {
        const userAgent = navigator.userAgent.toLowerCase();
        const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent) ||
                         (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
        const isTablet = /ipad|android(?!.*mobile)/i.test(userAgent);
        const isIOS = /iphone|ipad|ipod/i.test(userAgent);
        const isAndroid = /android/i.test(userAgent);
        
        return { isMobile, isTablet, isIOS, isAndroid };
    };

    const deviceInfo = getDeviceInfo();
    const emailBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    
    const openMailto = () => {
        const mailtoUrl = `mailto:${myemail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoUrl;
        return 'Opening your default mail app...';
    };

    const openGmail = () => {
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${myemail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
        window.open(gmailUrl, '_blank');
        return 'Gmail opened in new tab!';
    };

    try {
        let message = '';
        
        // Use preferred method if specified, otherwise use device-based logic
        if (preferredMethod === 'gmail') {
            message = openGmail();
        } else if (preferredMethod === 'mailto') {
            message = openMailto();
        } else {
            // Auto-detect based on device
            if (deviceInfo.isMobile && !deviceInfo.isTablet) {
                // Mobile phones: prefer native mail app
                message = openMailto();
            } else {
                // Desktop and tablets: prefer Gmail web
                message = openGmail();
            }
        }
        
        toast.success(message);
        
        // Clear form after successful attempt
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    } catch (error) {
        console.error('Primary method failed:', error);
        
        // Intelligent fallback
        try {
            let fallbackMessage = '';
            
            if (preferredMethod === 'gmail' || (!deviceInfo.isMobile || deviceInfo.isTablet)) {
                // If Gmail failed or we're on desktop/tablet, try mailto
                fallbackMessage = openMailto();
            } else {
                // If mailto failed or we're on mobile, try Gmail
                fallbackMessage = openGmail();
            }
            
            toast.success(fallbackMessage);
        } catch (fallbackError) {
            console.error('Fallback method also failed:', fallbackError);
            
            // Final fallback: show contact information
            const contactInfo = 'odesanyalanre3@gmail.com';
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(contactInfo).then(() => {
                    toast.error('Email clients unavailable. Email address copied to clipboard!');
                }).catch(() => {
                    toast.error(`Email clients unavailable. Please contact: ${contactInfo}`);
                });
            } else {
                toast.error(`Email clients unavailable. Please contact: ${contactInfo}`);
            }
        }
    }
};


    const hoverColor = isDarkMode ? 'hover:text-gray-300' : 'hover:text-gray-700';
    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
        setIsMenuOpen(false);
    };

    const projects = [
        {
            title: "DeFi Yield Farming Protocol",
            description: "Built a smart contract system for automated yield farming with multi-token support and compound rewards.",
            tech: ["Solidity", "OpenZeppelin", "Hardhat", "Ethers.js"],
            features: ["Auto-compounding rewards", "Multi-token staking", "Emergency withdraw", "Time-locked contracts"],
            github: "https://github.com",
            demo: "https://demo.com",
            status: "Live on Mainnet"
        },
        {
            title: "NFT Marketplace Contract",
            description: "Developed a gas-optimized NFT marketplace with royalty distribution and batch minting capabilities.",
            tech: ["Solidity", "ERC-721", "IPFS", "React"],
            features: ["Royalty management", "Batch operations", "Lazy minting", "Upgradeable proxy"],
            github: "https://github.com",
            demo: "https://demo.com",
            status: "In Development"
        },
        {
            title: "Multi-Sig Wallet System",
            description: "Created a secure multi-signature wallet with role-based access and transaction queuing system.",
            tech: ["Solidity", "Gnosis Safe", "Web3.js", "TypeScript"],
            features: ["M-of-N signatures", "Role management", "Transaction queuing", "Gas optimization"],
            github: "https://github.com",
            demo: "https://demo.com",
            status: "Audited"
        },
        {   title: "Storage Smart Contract",
            description: "A basic Solidity Smart Contract that stores and retrieves an unsigned integer values on the Ethereum blockchain.",
            tech: ["Solidity", "Hardhart", "Ethers.js", "Ethereum"],
            features: ["Deploys to Ethereum Testnet", "Retrieves Stored value instantly", "Stores and update a single value", "Uses Hardhat for development/testing"],
            github: "https://github.com",
            demo: "",
            status: "Completed/Deployed to Testnet"
        },
        {   title: "Hello Web3 Apps",
            description: "A  simple Web3 application that allows users to interact with a deployed smart contract on the Ethereum Sepolia testnet. The contract stores a message string which can be retrieved or updated by connected users using MetaMask.",
            tech: ["Solidity", "Hardhart", "Ethers.js", "Ethereum Sepolia", "Metamask", "Remix IDE", "VS Code"],
            features: ["Connect MetaMask wallet", "Read current message from the smart contract", "Retrieve stored messages from blockchain", "Update the message (on-chain transaction)"],
            github: "https://github.com",
            demo: "https://larryjay007.github.io/helloweb3/",
            status: "Completed"
        },
        {   title: "Voting dApps",
            description: "This smart contract allows token-based voting on proposals. Only accounts with allocated tokens can vote. Built in Solidity and tested using Remix on the Sepolia testnet.",
            tech: ["Solidity", "Hardhart", "Ethers.js", "Ethereum Sepolia", "Metamask"],
            features: ["Mint voting tokens to an address", "Cast votes using tokens", "Track proposal vote counts", "Restrict voting access with a custom modifier", "Emits an event when a vote is cast"],
            github: "https://github.com",
            demo: "",
            status: "In Progress"
        }
    ];

    const skills = [
        { name: "Solidity", level: 85, category: "Smart Contracts" },
        { name: "Hardhat/Foundry", level: 80, category: "Development" },
        { name: "Web3.js/Ethers.js", level: 90, category: "Integration" },
        { name: "OpenZeppelin", level: 85, category: "Security" },
        { name: "React/Next.js", level: 88, category: "Frontend" },
        { name: "Node.js", level: 82, category: "Backend" }
    ];

    const services = [
        {
            icon: <Code className="w-8 h-8" />,
            title: "Smart Contract Development",
            description: "Custom smart contracts built with security and gas efficiency in mind.",
            features: ["ERC Standards", "DeFi Protocols", "Custom Logic", "Testing Suite"]
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Security Auditing",
            description: "Comprehensive security reviews and vulnerability assessments.",
            features: ["Code Review", "Vulnerability Testing", "Gas Optimization", "Best Practices"]
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "DApp Integration",
            description: "Seamless integration of smart contracts with web applications.",
            features: ["Web3 Integration", "Wallet Connection", "Transaction Handling", "Event Listening"]
        }
    ];


    // Theme classes
    const bgPrimary = isDarkMode ? 'bg-black' : 'bg-white';
    const bgSecondary = isDarkMode ? 'bg-gray-900' : 'bg-gray-50';
    const bgCard = isDarkMode ? 'bg-gray-900' : 'bg-white';
    const textPrimary = isDarkMode ? 'text-white' : 'text-black';
    const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-700';
    const textMuted = isDarkMode ? 'text-gray-400' : 'text-gray-500';
    const border = isDarkMode ? 'border-gray-800' : 'border-gray-200';
    const navBg = isDarkMode ? 'bg-black/95' : 'bg-white/95';
    const inputBg = isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300';

    return (
        <div className={`min-h-screen transition-all duration-500 ${bgPrimary} ${textPrimary}`}>
            {/* Navigation */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? `${navBg} backdrop-blur-md shadow-xl` : 'bg-transparent'}`}>
                <div className="container mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold">
                            {acronym}
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            {['home', 'about', 'projects', 'services', 'contact'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => scrollToSection(item)}
                                    className={`capitalize hover:text-gray-500 transition-colors font-medium ${activeSection === item ? 'text-gray-500' : ''}`}
                                >
                                    {item}
                                </button>
                            ))}
                            <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                            >
                                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center space-x-4">
                            <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-full transition-all duration-300 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                            >
                                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? <X className='cursor-pointer' /> : <Menu className='cursor-pointer' />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className={`md:hidden mt-4 pb-4 z-50 border-t ${border}`}>
                            {['home', 'about', 'projects', 'services', 'contact'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => scrollToSection(item)}
                                    className="block w-full text-left py-3 capitalize hover:text-gray-500 transition-colors font-medium"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </nav>
            {/* Hero Section */}
            <section id="home" className=" pt-20 z-20 py-10 flex items-center justify-center relative overflow-hidden">
                <div className="container mx-auto px-6 text-center z-10">
                    <div className="max-w-4xl mx-auto">
                        {/* Enhanced Profile Image */}
                        <div className="relative mb-12">
                            <div className="p-2 w-full flex items-center justify-center mx-auto rounded-full ">
                                <img src={image} alt="logo img" className='w-52 h-52 object-cover rounded-full' />
                            </div>

                        </div>

                        <h1 className=" font-bold mb-6 tracking-tight">
                            <h1 className='text-4xl md:text-5xl'>{myname} </h1>
                            <span className="block mt-2 text-3xl "> Smart Contract Developer</span>
                        </h1>
                        <p className={`text-xl md:text-2xl mb-12 ${textSecondary} max-w-3xl mx-auto leading-relaxed`}>
                            Building the future of decentralized applications with secure, efficient smart contracts that power Web3 innovation
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                            <button
                                onClick={() => scrollToSection('projects')}
                                className={`${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} px-10 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105`}
                            >
                                View My Work <ArrowRight className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => scrollToSection('contact')}
                                className={`border-2 ${isDarkMode ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'} px-10 py-4 rounded-full font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105`}
                            >
                                Get In Touch
                            </button>
                        </div>

                        {/* Social Links */}
                        <div className="flex justify-center space-x-8">
                            <a href="https://github.com/Larryjay007" 
                               target="_blank"
                               rel="noopener noreferrer"
                               className={`${textMuted} hover:text-gray-600 transition-all duration-300 hover:scale-125`}>
                                <FaGithub className="w-8 h-8" />
                            </a>
                            <a href="http://linkedin.com/in/lanre-odesanya" 
                               target="_blank"
                               rel="noopener noreferrer"
                               className={`${textMuted} hover:text-gray-600 transition-all duration-300 hover:scale-125`}>
                                <FaLinkedin className="w-8 h-8" />
                            </a>
                            <a href="https://x.com/odesanya_l82824?s=21" 
                               target="_blank"
                               rel="noopener noreferrer"className={`${textMuted} hover:text-gray-600 transition-all duration-300 hover:scale-125`}>
                                <FaXTwitter className="w-8 h-8" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className={`absolute bottom-16 left-1/2 transform -translate-x-1/2 animate-bounce ${textMuted}`}>
                    <ChevronDown className="w-8 h-8" />
                </div>
            </section>


            {/* About Section */}
            <section id="about" className={`py-24 ${bgSecondary}`}>
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                        About Me
                    </h2>
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <p className={`text-lg ${textSecondary} mb-6 leading-relaxed`}>
                                I'm a passionate Web3 developer specializing in smart contract development and DeFi protocols.
                                    With a strong foundation in Solidity and blockchain architecture, I create secure, gas-efficient
                                    smart contracts that power the next generation of decentralized applications.
                                </p>
                                <p className={`text-lg ${textSecondary} mb-10 leading-relaxed`}>
                                    My journey in blockchain development has equipped me with deep understanding of consensus mechanisms,
                                    tokenomics, and security best practices. I'm committed to building trustless systems that
                                    democratize finance and create new economic opportunities.
                                </p>

                                <div className="grid grid-cols-2 gap-8">
                                    <div className="text-center">
                                        <div className={`text-4xl font-bold ${textPrimary} mb-2`}>5+</div>
                                        <div className={`${textMuted} font-medium`}>Smart Contracts</div>
                                    </div>
                                    <div className="text-center">
                                        <div className={`text-4xl font-bold ${textPrimary} mb-2`}>2+</div>
                                        <div className={`${textMuted} font-medium`}>DApps Built</div>
                                    </div>
                                    {/* <div className="text-center">
                                        <div className={`text-4xl font-bold ${textPrimary} mb-2`}>$2M+</div>
                                        <div className={`${textMuted} font-medium`}>TVL Managed</div>
                                    </div> */}
                                    <div className="text-center">
                                        <div className={`text-4xl font-bold ${textPrimary} mb-2`}>100%</div>
                                        <div className={`${textMuted} font-medium`}>Audit Success</div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold mb-8">Technical Skills</h3>
                                <div className="space-y-6">
                                    {skills.map((skill, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between mb-3">
                                                <span className="font-semibold">{skill.name}</span>
                                                <span className={`${textMuted}`}>{skill.level}%</span>
                                            </div>
                                            <div className={`w-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-full h-3`}>
                                                <div
                                                    className={`${isDarkMode ? 'bg-white' : 'bg-black'} h-3 rounded-full transition-all duration-1000 ease-out`}
                                                    style={{ width: `${skill.level}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Projects Section */}
            <section id="projects" className="py-24">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                        Featured Projects
                    </h2>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                        {projects.map((project, index) => (
                            <div key={index} className={`${bgCard} rounded-2xl p-8 hover:transform hover:scale-105 transition-all duration-300 ${border} border shadow-xl hover:shadow-2xl`}>
                                <div className="flex justify-between items-start mb-6">
                                    <h3 className="text-xl font-bold">{project.title}</h3>
                                    <span className={`px-4  py-2 rounded-full text-xs font-medium ${project.status === 'Live on Mainnet' ? `${isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'}` :
                                        project.status === 'In Development' ? `${isDarkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'}` :
                                            `${isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'}`
                                        }`}>
                                        {project.status}
                                    </span>
                                </div>

                                <p className={`${textSecondary} mb-6 leading-relaxed`}>{project.description}</p>

                                <div className="mb-6">
                                    <h4 className="font-semibold mb-3">Key Features:</h4>
                                    <ul className="space-y-2">
                                        {project.features.map((feature, idx) => (
                                            <li key={idx} className={`flex items-center text-sm ${textSecondary}`}>
                                                <CheckCircle className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'} mr-3 flex-shrink-0`} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mb-6">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech, idx) => (
                                            <span key={idx} className={`px-3 py-1 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-full text-xs font-medium`}>
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Links */}
                                <div className="flex items-ceter gap-2">
                                    <div className="font-bold text-sm">View repo:</div>
                                    <a href="https://github.com" className={`${textMuted} ${hoverColor} transition-all duration-300 hover:scale-125`}>
                                        <FaGithub className="w-8 h-8" />
                                    </a>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className={`py-24 ${bgSecondary}`}>
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                        Services
                    </h2>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className={`${bgCard} rounded-2xl p-10 hover:transform hover:scale-105 transition-all duration-300 ${border} border shadow-xl hover:shadow-2xl`}>
                                <div className={`${textMuted} mb-6`}>{service.icon}</div>
                                <h3 className="text-2xl font-bold mb-6">{service.title}</h3>
                                <p className={`${textSecondary} mb-8 leading-relaxed`}>{service.description}</p>
                                <ul className="space-y-3">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className={`flex items-center text-sm ${textSecondary}`}>
                                            <CheckCircle className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'} mr-3`} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-8">
                            Let's Build Something Amazing
                        </h2>
                        <p className={`text-xl ${textSecondary} mb-16 leading-relaxed`}>
                            Ready to bring your Web3 project to life? Let's discuss how we can work together
                            to create secure, efficient smart contracts for your DApp.
                        </p>

                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            <div className="text-center">
                                <div className={`w-20 h-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl`}>
                                    <Mail className="w-10 h-10" />
                                </div>
                                <h3 className="font-bold mb-3 text-xl">Email</h3>
                                <p className={`${textSecondary}`}>Odesanyalanre3@gmail.com</p>
                            </div>
                            <div className="text-center">
                                <div className={`w-20 h-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl`}>
                                    <FaGithub  className="w-10 h-10" />
                                </div>
                                <h3 className="font-bold mb-3 text-xl">GitHub</h3>
                                <p className={`${textSecondary}`}>@Larryjay007</p>
                            </div>
                            <div className="text-center">
                                <div className={`w-20 h-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl`}>
                                    <FaLinkedin className="w-10 h-10" />
                                </div>
                                <h3 className="font-bold mb-3 text-xl">LinkedIn</h3>
                                <p className={`${textSecondary}`}>in/lanre-odesanya</p>
                            </div>
                        </div>

                        <div className={`${bgCard} rounded-2xl p-10 ${border} border shadow-xl`}>
                            <h3 className="text-2xl font-bold mb-8">Start a Project</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={`${inputBg} border rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300 ${textPrimary}`}
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`${inputBg} border rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300 ${textPrimary}`}
                                    />
                                </div>
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Project Subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    className={`w-full ${inputBg} border rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300 ${textPrimary}`}
                                />
                                <textarea
                                    name="message"
                                    placeholder="Tell me about your project..."
                                    rows={6}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className={`w-full ${inputBg} border rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none transition-all duration-300 ${textPrimary}`}
                                ></textarea>
                                <button
                                    className={`w-full ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} py-4 rounded-xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105`}
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className={`py-12 border-t ${border} ${bgSecondary}`}>
                <div className="container mx-auto px-6 text-center">
                    <p className={`${textMuted} text-lg`}>
                        &copy; 2025 {myname}. Building the decentralized future, one smart contract at a time.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Portfolio;
