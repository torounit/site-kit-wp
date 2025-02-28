/**
 * getDataErrorComponent function.
 *
 * Site Kit by Google, Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import CTA from 'GoogleComponents/notifications/cta';
import Layout from 'GoogleComponents/layout/layout';
import { showErrorNotification } from 'GoogleUtil';
import InvalidCredentialsWarning
	from 'SiteKitCore/components/notifications/invalid-credentials-warning';

const { __, sprintf } = wp.i18n;
const { Fragment } = wp.element;

/**
 * Creates a CTA component when there's a data error. Different wrapper HTML is needed depending on where the CTA gets output, which is determined by the inGrid, fullWidth, and createGrid parameters.
 *
 * @param {string}  moduleName Name of module, translated.
 * @param {string}  error      Description of error.
 * @param {boolean} inGrid     Creates layout to fit within an existing grid with 'cell' classes. Default is half-width grid cells. Default: false.
 * @param {boolean} fullWidth  Creates layout with 'cell--span-12' to be full width. Default: false.
 * @param {boolean} createGrid Adds a full grid layout with padding. Default: false.
 */
const getDataErrorComponent = ( moduleName, error, inGrid = false, fullWidth = false, createGrid = false ) => {

	const cta = <CTA
		title={ sprintf( __( 'Data error in %s', 'google-site-kit' ), moduleName ) }
		description={ error }
		error
	/>;

	// This is to handle token expired error specifically.
	if ( 'Invalid Credentials' === error ) {
		showErrorNotification( InvalidCredentialsWarning );
	}

	return (
		<Fragment>
			{ inGrid && fullWidth && createGrid &&
				<div className="
					mdc-layout-grid__cell
					mdc-layout-grid__cell--span-12
				">
					<Layout fill>
						<div className="mdc-layout-grid mdc-layout-grid--fill">
							<div className="mdc-layout-grid__inner">
								<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
									{ cta }
								</div>
							</div>
						</div>
					</Layout>
				</div>
			}
			{ inGrid && ! fullWidth && createGrid &&
				<div className="
					mdc-layout-grid__cell
					mdc-layout-grid__cell--span-6-desktop
					mdc-layout-grid__cell--span-4-tablet
				">
					<Layout fill>
						<div className="mdc-layout-grid mdc-layout-grid--fill">
							<div className="mdc-layout-grid__inner">
								<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
									{ cta }
								</div>
							</div>
						</div>
					</Layout>
				</div>
			}
			{ inGrid && fullWidth && ! createGrid &&
				<div className="
					mdc-layout-grid__cell
					mdc-layout-grid__cell--span-12
				">
					{ cta }
				</div>
			}
			{ inGrid && ! fullWidth && ! createGrid &&
				<div className="
					mdc-layout-grid__cell
					mdc-layout-grid__cell--span-6-desktop
					mdc-layout-grid__cell--span-4-tablet
				">
					{ cta }
				</div>
			}
			{ ! inGrid && ! fullWidth && createGrid &&
				<div className="mdc-layout-grid">
					<div className="mdc-layout-grid__inner">
						<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
							{ cta }
						</div>
					</div>
				</div>
			}
			{ ! inGrid && ! fullWidth && ! createGrid &&
				cta
			}
		</Fragment>
	);
};

export default getDataErrorComponent;
