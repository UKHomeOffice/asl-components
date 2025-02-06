import React from 'react';

const SupportingLinks = ({ sectionTitle, links }) => (
    <div className="govuk-grid-column-one-third">
        <div className="x-govuk-related-navigation">
            <nav className="x-govuk-related-navigation__nav-section" role="navigation" aria-labelledby="related-navigation-related-content">
                <h2 className="x-govuk-related-navigation__main-heading" id="related-navigation-related-content">{sectionTitle}</h2>

                <ul className="x-govuk-related-navigation__link-list">
                    {links.map(link => (
                        <li className="x-govuk-related-navigation__link" key={link.href}>
                            <a className="govuk-link x-govuk-related-navigation__section-link x-govuk-related-navigation__section-link--other" href={link.href}>{link.label}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    </div>
);

export default SupportingLinks;
