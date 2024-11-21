import { Link, LinkProps } from 'react-router-dom'

export type NavLinkProps = LinkProps

// NavLinkProps is a type alias for LinkProps, allowing this component to accept
// the same props as the Link component from react-router-dom.

// This component acts as a custom Link, inheriting all props passed down from the parent component
// and applying additional default styles via the `className` property.

export function NavLink(props: NavLinkProps) {
  return (
    <Link
      {...props} // Spreads all incoming props onto the Link component.
      className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      // Adds custom Tailwind CSS classes:
      // - flex: Makes the link a flex container.
      // - items-center: Aligns children vertically at the center.
      // - gap-1.5: Adds spacing of 0.375rem (6px) between child elements.
      // - text-sm: Sets the font size to small.
      // - font-medium: Makes the font weight medium.
      // - text-muted-foreground: Sets the text color to a muted shade by default.
      // - hover:text-foreground: Changes text color to a more prominent shade on hover.
    />
  )
}
