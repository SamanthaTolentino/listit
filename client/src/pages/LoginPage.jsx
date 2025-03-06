import { React, useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import InputField from '../components/InputField';
import FormBtn from '../components/FormBtn';
import Logo from '../components/Logo';
import { useAuthStore } from '../store/authStore';
import LoginImage from '../assets/img/login-image.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const { login, isLoading, error } = useAuthStore()

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='grid grid-cols-5 h-screen relative'>
      <div className='absolute py-6 px-8'>
        <Logo />
      </div>
      <div className='col-span-3 flex flex-col items-center justify-center text-center'>
        <motion.div className='w-3/5'
          initial={{ opacity: 0, y: 30}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut', delay: 0.15}}
        >
          <div className='text-5xl font-medium mb-5'>Welcome Back!</div>
          <div className='text-lg text-gray-1 font-medium mb-10'>Please enter your credentials to sign in.</div>
          <form onSubmit={handleLogin} className='flex flex-col items-center w-full mb-8'>
            <motion.div className={ `w-full bg-gray-8 px-6 flex items-center rounded-full text-gray-4 shadow mb-6 max-w-lg`}>
              <FontAwesomeIcon icon={faEnvelope} />
              <InputField onChange={(e) => setEmail(e.target.value)} name='email' value={email} type='email' placeholder='Email' />
            </motion.div>
            <div className={`w-full bg-gray-8 px-6 flex items-center rounded-full text-gray-4 shadow mb-6 max-w-lg`}>
              <FontAwesomeIcon icon={faLock} />
              <InputField onChange={(e) => setPassword(e.target.value)} name='password' value={password} type='password' placeholder='Password' classes='mb-10 max-w-lg' />
            </div>
            <FormBtn text='SIGN IN' />
          </form>
          <div className='text-gray-1'>Don't have an account? <Link to={'/signup'} className='text-light-purple-1 transition hover:text-dark-purple-2 font-semibold border-b-2 border-transparent hover:border-light-purple-1'>Sign up here</Link></div>
        </motion.div>
      </div>
      <motion.div className='col-span-2 bg-light-purple-2 flex items-center justify-center'
        initial={{ opacity: 0, y: -50}}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut', delay: 0.15}}
      >
      <motion.svg className='w-2/3' width="683" height="408" viewBox="0 0 683 408" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_64_4)">
        <motion.path d="M522.921 403.386C514.177 396.003 508.865 384.341 510.258 372.987C511.651 361.634 520.278 351.197 531.469 348.786C542.66 346.375 555.417 353.049 558.816 363.971C560.686 342.913 562.842 320.972 574.047 303.039C584.193 286.801 601.767 275.182 620.812 273.103C639.858 271.024 659.91 278.875 671.788 293.895C683.666 308.915 686.574 330.751 678.255 347.995C672.127 360.698 660.836 370.152 649.007 377.843C610.781 402.487 564.934 412.508 519.901 406.064L522.921 403.386Z" fill="#6C63FF"
          initial={{
            y: 10
          }}
          animate={{
            rotate: -5,
            x: -5,
            y: -1
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            repeatDelay: 0.15,
            ease: 'easeInOut',
            duration: 2.5
          }}
        />
        <motion.path d="M652.954 279.311C637.239 292.1 622.822 306.404 609.912 322.016C589.708 346.364 573.359 373.663 561.434 402.962C560.561 405.099 564.034 406.029 564.897 403.916C584.409 356.299 615.558 314.331 655.494 281.849C657.288 280.389 654.733 277.864 652.954 279.311Z" fill="white"
          initial={{
            y: 10
          }}
          animate={{
            rotate: -5,
            x: -10,
            y: -1
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            repeatDelay: 0.15,
            ease: 'easeInOut',
            duration: 2.5
          }}
        />
        <motion.path d="M219.869 401.38C231.879 391.24 239.174 375.222 237.261 359.628C235.348 344.034 223.498 329.698 208.128 326.387C192.757 323.075 175.236 332.242 170.567 347.244C167.998 318.32 165.037 288.185 149.647 263.553C135.711 241.25 111.574 225.292 85.4152 222.437C59.2562 219.582 31.7141 230.365 15.3997 250.994C-0.914667 271.624 -4.90918 301.616 6.517 325.301C14.9343 342.748 30.4419 355.733 46.6899 366.297C98.5269 399.999 162.831 414.055 224.017 405.058" fill="#6C63FF"
          initial={{
            y: 5
          }}
          animate={{
            rotate: 5,
            x: 5,
            y: -5
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            repeatDelay: 0.15,
            ease: 'easeInOut',
            duration: 2.5
          }}
        />
        <motion.path d="M41.2679 230.962C62.8523 248.529 82.6537 268.175 100.386 289.618C118.121 311.038 133.734 334.127 147.007 358.56C154.426 372.265 161.091 386.365 166.972 400.797C168.171 403.733 163.4 405.011 162.214 402.108C151.798 376.665 138.911 352.303 123.739 329.372C108.64 306.524 91.3591 285.193 72.1381 265.679C61.2667 254.648 49.7963 244.222 37.7791 234.448C35.3159 232.444 38.825 228.975 41.2679 230.962Z" fill="white"
          initial={{
            y: 5
          }}
          animate={{
            rotate: 5,
            x: 15,
            y: -5
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            repeatDelay: 0.15,
            ease: 'easeInOut',
            duration: 2.5
          }}
        />
        <path d="M490.268 407.107H203.722V113.347C203.722 50.847 254.612 0 317.163 0H376.828C439.379 0 490.268 50.847 490.268 113.347V407.107Z" fill="white"/>
        <path d="M430.604 407.107H203.722V113.347C203.66 89.3981 211.25 66.0549 225.387 46.7157C225.908 46.006 226.428 45.3055 226.964 44.6126C233.802 35.6516 241.939 27.7598 251.107 21.1976C251.625 20.8211 252.145 20.4511 252.673 20.0811C260.345 14.7765 268.643 10.4401 277.38 7.1706C277.899 6.97411 278.427 6.77724 278.956 6.58841C286.857 3.77088 295.048 1.84089 303.378 0.834064C303.894 0.763585 304.424 0.708435 304.954 0.653283C313.071 -0.213855 321.257 -0.213855 329.374 0.653283C329.902 0.708435 330.433 0.763578 330.955 0.834818C339.282 1.84171 347.471 3.77146 355.371 6.58844C355.899 6.77727 356.427 6.97413 356.948 7.171C365.577 10.3993 373.778 14.671 381.368 19.8908C381.895 20.2527 382.423 20.6227 382.943 20.9927C388.082 24.6581 392.909 28.7414 397.375 33.2012C400.957 36.7784 404.294 40.5916 407.365 44.6149C407.899 45.3055 408.419 46.006 408.939 46.7146C423.076 66.054 430.667 89.3977 430.604 113.347V407.107Z" fill="#CCCCCC"/>
        <path d="M412.155 275.719C419.092 275.719 424.716 270.1 424.716 263.168C424.716 256.237 419.092 250.618 412.155 250.618C405.218 250.618 399.594 256.237 399.594 263.168C399.594 270.1 405.218 275.719 412.155 275.719Z" fill="#2F2E41"/>
        <path d="M466.794 398.308H457.17L452.59 361.215L466.796 361.216L466.794 398.308Z" fill="#FFB8B8"/>
        <path d="M450.294 395.561H468.856V407.238H438.607C438.607 405.704 438.91 404.186 439.497 402.769C440.084 401.352 440.945 400.065 442.031 398.981C443.116 397.896 444.404 397.036 445.822 396.449C447.24 395.863 448.76 395.561 450.294 395.561Z" fill="#2F2E41"/>
        <path d="M514.683 398.308H505.058L500.479 361.215L514.685 361.216L514.683 398.308Z" fill="#FFB8B8"/>
        <path d="M498.183 395.561H516.745V407.238H486.496C486.496 405.704 486.798 404.186 487.386 402.769C487.973 401.352 488.834 400.065 489.919 398.981C491.004 397.896 492.293 397.036 493.711 396.449C495.129 395.863 496.648 395.561 498.183 395.561Z" fill="#2F2E41"/>
        <path d="M418.512 265.655C417.82 264.635 417.36 263.477 417.164 262.26C416.968 261.044 417.042 259.8 417.379 258.615C417.717 257.43 418.31 256.334 419.118 255.403C419.925 254.472 420.928 253.729 422.053 253.227L454.771 163.125L470.871 171.904L433.514 258.008C434.233 259.954 434.212 262.096 433.456 264.028C432.7 265.959 431.261 267.547 429.412 268.489C427.563 269.432 425.432 269.664 423.423 269.141C421.414 268.619 419.667 267.378 418.512 265.655Z" fill="#FFB8B8"/>
        <path d="M509.766 282.585C508.697 281.973 507.775 281.133 507.065 280.126C506.355 279.118 505.875 277.968 505.659 276.755C505.442 275.542 505.494 274.297 505.812 273.106C506.129 271.916 506.704 270.809 507.495 269.865L497.36 174.552L515.681 175.389L519.893 269.141C521.393 270.575 522.315 272.509 522.483 274.576C522.651 276.643 522.055 278.701 520.806 280.358C519.558 282.015 517.745 283.157 515.71 283.567C513.675 283.978 511.561 283.629 509.766 282.585Z" fill="#FFB8B8"/>
        <path d="M480.538 146.436C491.187 146.436 499.82 137.81 499.82 127.17C499.82 116.53 491.187 107.904 480.538 107.904C469.889 107.904 461.256 116.53 461.256 127.17C461.256 137.81 469.889 146.436 480.538 146.436Z" fill="#FFB8B8"/>
        <path d="M509.643 260.908H451.512L451.582 260.456C451.687 259.78 461.942 192.653 454.378 170.692C453.619 168.534 453.686 166.171 454.566 164.059C455.445 161.947 457.076 160.235 459.143 159.252C469.955 154.165 490.709 147.901 508.225 163.103C510.803 165.377 512.816 168.219 514.104 171.404C515.393 174.589 515.923 178.03 515.651 181.455L509.643 260.908Z" fill="#6C63FF"/>
        <path d="M462.677 202.573L436.506 197.268L448.773 168.222C449.507 165.408 451.328 163.001 453.837 161.527C456.345 160.054 459.336 159.634 462.153 160.361C464.971 161.088 467.385 162.901 468.865 165.404C470.346 167.906 470.773 170.894 470.053 173.711L462.677 202.573Z" fill="#6C63FF"/>
        <path d="M496.196 212.424L494.623 176.387C493.429 169.613 497.311 163.209 503.28 162.162C509.25 161.119 515.08 165.817 516.279 172.642L522.193 206.314L496.196 212.424Z" fill="#6C63FF"/>
        <path d="M507.709 256.594C517.063 292.188 518.083 337.442 515.56 386.805L502.999 385.236L480.232 291.108L467.671 386.805L453.54 386.021C449.319 334.227 445.208 289.762 451.97 260.516L507.709 256.594Z" fill="#2F2E41"/>
        <path d="M493.243 142.059C489.646 145.888 482.966 143.833 482.497 138.602C482.46 138.196 482.463 137.788 482.505 137.382C482.747 135.065 484.086 132.962 483.766 130.516C483.693 129.907 483.466 129.327 483.106 128.83C480.24 124.995 473.511 130.545 470.806 127.074C469.147 124.945 471.097 121.593 469.824 119.213C468.144 116.073 463.167 117.622 460.047 115.902C456.575 113.989 456.782 108.666 459.068 105.428C461.855 101.48 466.742 99.3731 471.569 99.0694C476.395 98.7658 481.188 100.069 485.694 101.824C490.813 103.817 495.89 106.572 499.04 111.07C502.871 116.54 503.24 123.893 501.324 130.289C500.158 134.18 496.18 138.933 493.243 142.059Z" fill="#2F2E41"/>
        <path d="M659.434 407.612H79.8306C79.5832 407.611 79.3461 407.512 79.1714 407.337C78.9967 407.162 78.8986 406.925 78.8986 406.678C78.8986 406.43 78.9967 406.193 79.1714 406.018C79.3461 405.843 79.5832 405.744 79.8306 405.744H659.434C659.681 405.744 659.918 405.843 660.093 406.018C660.268 406.193 660.366 406.43 660.366 406.678C660.366 406.925 660.268 407.162 660.093 407.337C659.918 407.512 659.681 407.611 659.434 407.612Z" fill="#3F3D56"/>
        <path d="M368.192 321.999H266.134C264.79 322.006 263.498 321.48 262.542 320.537C261.585 319.594 261.042 318.31 261.032 316.967V89.356C261.042 88.0131 261.585 86.7291 262.542 85.7857C263.498 84.8423 264.79 84.3166 266.134 84.3238H368.192C369.536 84.3166 370.828 84.8423 371.785 85.7857C372.741 86.7291 373.284 88.0131 373.295 89.356V316.967C373.284 318.31 372.741 319.594 371.785 320.537C370.828 321.48 369.536 322.006 368.192 321.999Z" fill="white"/>
        <path d="M373.295 157.971H261.032V159.54H373.295V157.971Z" fill="#CCCCCC"/>
        <path d="M373.687 247.48H261.424V249.049H373.687V247.48Z" fill="#CCCCCC"/>
        <path d="M297.929 84.3237H296.359V322.783H297.929V84.3237Z" fill="#CCCCCC"/>
        <path d="M337.182 84.3237H335.612V322.783H337.182V84.3237Z" fill="#CCCCCC"/>
        </g>
        <defs>
        <clipPath id="clip0_64_4">
        <rect width="683" height="408" fill="white"/>
        </clipPath>
        </defs>
      </motion.svg>

 
      </motion.div>
    </div>

    // <motion.div
    //   initial={{opacity: 0, y: 20}}
    //   animate={{opacity: 1, y: 0}}
    //   transition={{duration: 0.5}}
    //   className='max-w-md w-full bg-gray-800 opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
    //     <div className='p-8'>
    //       <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
    //         Welcome Back
    //       </h2>

    //       <form onSubmit={handleLogin}>
    //         <Input
    //           icon={Mail}
    //           type='email'
    //           placeholder='Email Address'
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //         />
    //         <Input
    //           icon={Lock}
    //           type='password'
    //           placeholder='Password'
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}          
    //         />

    //         {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}

    //         <motion.button
    //           className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
    //           whileHover={{ scale: 1.02 }}
    //           whileTap={{ scale: 0.98 }}
    //           type='submit'
    //           disabled={isLoading}
    //         >
    //           {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto' /> : 'Login'}
    //         </motion.button>
    //       </form>
    //     </div>

    //   <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
    //     <p className='text-sm text-gray-400'>
    //       Don't have an account?{" "}
    //       <Link to={"/signup"} className='text-green-400 hover:underline'>
    //         Sign Up
    //       </Link>
    //     </p>
    //   </div>
    // </motion.div>
  )
}

export default LoginPage
