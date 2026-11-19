export default function GoogleIcon({ icon, className }: { icon: string, className?: string }) {

    return (

        <span className={`material-symbols-outlined ${className}`}>{ icon }</span>

    )

}