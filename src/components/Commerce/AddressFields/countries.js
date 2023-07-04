// Reference: https://gist.github.com/maephisto/9228207#gistcomment-1471858
const countries = [
    {'abbreviation' : 'AF', 'name' : 'Afghanistan'},
    {'abbreviation' : 'AX', 'name' : 'Aland Islands'},
    {'abbreviation' : 'AL', 'name' : 'Albania'},
    {'abbreviation' : 'DZ', 'name' : 'Algeria'},
    {'abbreviation' : 'AS', 'name' : 'American Samoa'},
    {'abbreviation' : 'AD', 'name' : 'Andorra'},
    {'abbreviation' : 'AO', 'name' : 'Angola'},
    {'abbreviation' : 'AI', 'name' : 'Anguilla'},
    {'abbreviation' : 'AQ', 'name' : 'Antarctica'},
    {'abbreviation' : 'AG', 'name' : 'Antigua And Barbuda'},
    {'abbreviation' : 'AR', 'name' : 'Argentina'},
    {'abbreviation' : 'AM', 'name' : 'Armenia'},
    {'abbreviation' : 'AW', 'name' : 'Aruba'},
    {'abbreviation' : 'AU', 'name' : 'Australia'},
    {'abbreviation' : 'AT', 'name' : 'Austria'},
    {'abbreviation' : 'AZ', 'name' : 'Azerbaijan'},
    {'abbreviation' : 'BS', 'name' : 'Bahamas'},
    {'abbreviation' : 'BH', 'name' : 'Bahrain'},
    {'abbreviation' : 'BD', 'name' : 'Bangladesh'},
    {'abbreviation' : 'BB', 'name' : 'Barbados'},
    {'abbreviation' : 'BY', 'name' : 'Belarus'},
    {'abbreviation' : 'BE', 'name' : 'Belgium'},
    {'abbreviation' : 'BZ', 'name' : 'Belize'},
    {'abbreviation' : 'BJ', 'name' : 'Benin'},
    {'abbreviation' : 'BM', 'name' : 'Bermuda'},
    {'abbreviation' : 'BT', 'name' : 'Bhutan'},
    {'abbreviation' : 'BO', 'name' : 'Bolivia'},
    {'abbreviation' : 'BA', 'name' : 'Bosnia And Herzegovina'},
    {'abbreviation' : 'BW', 'name' : 'Botswana'},
    {'abbreviation' : 'BV', 'name' : 'Bouvet Island'},
    {'abbreviation' : 'BR', 'name' : 'Brazil'},
    {'abbreviation' : 'IO', 'name' : 'British Indian Ocean Territory'},
    {'abbreviation' : 'BN', 'name' : 'Brunei Darussalam'},
    {'abbreviation' : 'BG', 'name' : 'Bulgaria'},
    {'abbreviation' : 'BF', 'name' : 'Burkina Faso'},
    {'abbreviation' : 'BI', 'name' : 'Burundi'},
    {'abbreviation' : 'KH', 'name' : 'Cambodia'},
    {'abbreviation' : 'CM', 'name' : 'Cameroon'},
    {'abbreviation' : 'CA', 'name' : 'Canada'},
    {'abbreviation' : 'CV', 'name' : 'Cape Verde'},
    {'abbreviation' : 'KY', 'name' : 'Cayman Islands'},
    {'abbreviation' : 'CF', 'name' : 'Central African Republic'},
    {'abbreviation' : 'TD', 'name' : 'Chad'},
    {'abbreviation' : 'CL', 'name' : 'Chile'},
    {'abbreviation' : 'CN', 'name' : 'China'},
    {'abbreviation' : 'CX', 'name' : 'Christmas Island'},
    {'abbreviation' : 'CC', 'name' : 'Cocos (Keeling) Islands'},
    {'abbreviation' : 'CO', 'name' : 'Colombia'},
    {'abbreviation' : 'KM', 'name' : 'Comoros'},
    {'abbreviation' : 'CG', 'name' : 'Congo'},
    {'abbreviation' : 'CD', 'name' : 'Congo, Democratic Republic'},
    {'abbreviation' : 'CK', 'name' : 'Cook Islands'},
    {'abbreviation' : 'CR', 'name' : 'Costa Rica'},
    {'abbreviation' : 'CI', 'name' : 'Cote D\'Ivoire'},
    {'abbreviation' : 'HR', 'name' : 'Croatia'},
    {'abbreviation' : 'CU', 'name' : 'Cuba'},
    {'abbreviation' : 'CY', 'name' : 'Cyprus'},
    {'abbreviation' : 'CZ', 'name' : 'Czech Republic'},
    {'abbreviation' : 'DK', 'name' : 'Denmark'},
    {'abbreviation' : 'DJ', 'name' : 'Djibouti'},
    {'abbreviation' : 'DM', 'name' : 'Dominica'},
    {'abbreviation' : 'DO', 'name' : 'Dominican Republic'},
    {'abbreviation' : 'EC', 'name' : 'Ecuador'},
    {'abbreviation' : 'EG', 'name' : 'Egypt'},
    {'abbreviation' : 'SV', 'name' : 'El Salvador'},
    {'abbreviation' : 'GQ', 'name' : 'Equatorial Guinea'},
    {'abbreviation' : 'ER', 'name' : 'Eritrea'},
    {'abbreviation' : 'EE', 'name' : 'Estonia'},
    {'abbreviation' : 'ET', 'name' : 'Ethiopia'},
    {'abbreviation' : 'FK', 'name' : 'Falkland Islands (Malvinas)'},
    {'abbreviation' : 'FO', 'name' : 'Faroe Islands'},
    {'abbreviation' : 'FJ', 'name' : 'Fiji'},
    {'abbreviation' : 'FI', 'name' : 'Finland'},
    {'abbreviation' : 'FR', 'name' : 'France'},
    {'abbreviation' : 'GF', 'name' : 'French Guiana'},
    {'abbreviation' : 'PF', 'name' : 'French Polynesia'},
    {'abbreviation' : 'TF', 'name' : 'French Southern Territories'},
    {'abbreviation' : 'GA', 'name' : 'Gabon'},
    {'abbreviation' : 'GM', 'name' : 'Gambia'},
    {'abbreviation' : 'GE', 'name' : 'Georgia'},
    {'abbreviation' : 'DE', 'name' : 'Germany'},
    {'abbreviation' : 'GH', 'name' : 'Ghana'},
    {'abbreviation' : 'GI', 'name' : 'Gibraltar'},
    {'abbreviation' : 'GR', 'name' : 'Greece'},
    {'abbreviation' : 'GL', 'name' : 'Greenland'},
    {'abbreviation' : 'GD', 'name' : 'Grenada'},
    {'abbreviation' : 'GP', 'name' : 'Guadeloupe'},
    {'abbreviation' : 'GU', 'name' : 'Guam'},
    {'abbreviation' : 'GT', 'name' : 'Guatemala'},
    {'abbreviation' : 'GG', 'name' : 'Guernsey'},
    {'abbreviation' : 'GN', 'name' : 'Guinea'},
    {'abbreviation' : 'GW', 'name' : 'Guinea-Bissau'},
    {'abbreviation' : 'GY', 'name' : 'Guyana'},
    {'abbreviation' : 'HT', 'name' : 'Haiti'},
    {'abbreviation' : 'HM', 'name' : 'Heard Island & Mcdonald Islands'},
    {'abbreviation' : 'VA', 'name' : 'Holy See (Vatican City State)'},
    {'abbreviation' : 'HN', 'name' : 'Honduras'},
    {'abbreviation' : 'HK', 'name' : 'Hong Kong'},
    {'abbreviation' : 'HU', 'name' : 'Hungary'},
    {'abbreviation' : 'IS', 'name' : 'Iceland'},
    {'abbreviation' : 'IN', 'name' : 'India'},
    {'abbreviation' : 'ID', 'name' : 'Indonesia'},
    {'abbreviation' : 'IR', 'name' : 'Iran, Islamic Republic Of'},
    {'abbreviation' : 'IQ', 'name' : 'Iraq'},
    {'abbreviation' : 'IE', 'name' : 'Ireland'},
    {'abbreviation' : 'IM', 'name' : 'Isle Of Man'},
    {'abbreviation' : 'IL', 'name' : 'Israel'},
    {'abbreviation' : 'IT', 'name' : 'Italy'},
    {'abbreviation' : 'JM', 'name' : 'Jamaica'},
    {'abbreviation' : 'JP', 'name' : 'Japan'},
    {'abbreviation' : 'JE', 'name' : 'Jersey'},
    {'abbreviation' : 'JO', 'name' : 'Jordan'},
    {'abbreviation' : 'KZ', 'name' : 'Kazakhstan'},
    {'abbreviation' : 'KE', 'name' : 'Kenya'},
    {'abbreviation' : 'KI', 'name' : 'Kiribati'},
    {'abbreviation' : 'KR', 'name' : 'Korea'},
    {'abbreviation' : 'KW', 'name' : 'Kuwait'},
    {'abbreviation' : 'KG', 'name' : 'Kyrgyzstan'},
    {'abbreviation' : 'LA', 'name' : 'Lao People\'s Democratic Republic'},
    {'abbreviation' : 'LV', 'name' : 'Latvia'},
    {'abbreviation' : 'LB', 'name' : 'Lebanon'},
    {'abbreviation' : 'LS', 'name' : 'Lesotho'},
    {'abbreviation' : 'LR', 'name' : 'Liberia'},
    {'abbreviation' : 'LY', 'name' : 'Libyan Arab Jamahiriya'},
    {'abbreviation' : 'LI', 'name' : 'Liechtenstein'},
    {'abbreviation' : 'LT', 'name' : 'Lithuania'},
    {'abbreviation' : 'LU', 'name' : 'Luxembourg'},
    {'abbreviation' : 'MO', 'name' : 'Macao'},
    {'abbreviation' : 'MK', 'name' : 'Macedonia'},
    {'abbreviation' : 'MG', 'name' : 'Madagascar'},
    {'abbreviation' : 'MW', 'name' : 'Malawi'},
    {'abbreviation' : 'MY', 'name' : 'Malaysia'},
    {'abbreviation' : 'MV', 'name' : 'Maldives'},
    {'abbreviation' : 'ML', 'name' : 'Mali'},
    {'abbreviation' : 'MT', 'name' : 'Malta'},
    {'abbreviation' : 'MH', 'name' : 'Marshall Islands'},
    {'abbreviation' : 'MQ', 'name' : 'Martinique'},
    {'abbreviation' : 'MR', 'name' : 'Mauritania'},
    {'abbreviation' : 'MU', 'name' : 'Mauritius'},
    {'abbreviation' : 'YT', 'name' : 'Mayotte'},
    {'abbreviation' : 'MX', 'name' : 'Mexico'},
    {'abbreviation' : 'FM', 'name' : 'Micronesia, Federated States Of'},
    {'abbreviation' : 'MD', 'name' : 'Moldova'},
    {'abbreviation' : 'MC', 'name' : 'Monaco'},
    {'abbreviation' : 'MN', 'name' : 'Mongolia'},
    {'abbreviation' : 'ME', 'name' : 'Montenegro'},
    {'abbreviation' : 'MS', 'name' : 'Montserrat'},
    {'abbreviation' : 'MA', 'name' : 'Morocco'},
    {'abbreviation' : 'MZ', 'name' : 'Mozambique'},
    {'abbreviation' : 'MM', 'name' : 'Myanmar'},
    {'abbreviation' : 'NA', 'name' : 'Namibia'},
    {'abbreviation' : 'NR', 'name' : 'Nauru'},
    {'abbreviation' : 'NP', 'name' : 'Nepal'},
    {'abbreviation' : 'NL', 'name' : 'Netherlands'},
    {'abbreviation' : 'AN', 'name' : 'Netherlands Antilles'},
    {'abbreviation' : 'NC', 'name' : 'New Caledonia'},
    {'abbreviation' : 'NZ', 'name' : 'New Zealand'},
    {'abbreviation' : 'NI', 'name' : 'Nicaragua'},
    {'abbreviation' : 'NE', 'name' : 'Niger'},
    {'abbreviation' : 'NG', 'name' : 'Nigeria'},
    {'abbreviation' : 'NU', 'name' : 'Niue'},
    {'abbreviation' : 'NF', 'name' : 'Norfolk Island'},
    {'abbreviation' : 'MP', 'name' : 'Northern Mariana Islands'},
    {'abbreviation' : 'NO', 'name' : 'Norway'},
    {'abbreviation' : 'OM', 'name' : 'Oman'},
    {'abbreviation' : 'PK', 'name' : 'Pakistan'},
    {'abbreviation' : 'PW', 'name' : 'Palau'},
    {'abbreviation' : 'PS', 'name' : 'Palestinian Territory, Occupied'},
    {'abbreviation' : 'PA', 'name' : 'Panama'},
    {'abbreviation' : 'PG', 'name' : 'Papua New Guinea'},
    {'abbreviation' : 'PY', 'name' : 'Paraguay'},
    {'abbreviation' : 'PE', 'name' : 'Peru'},
    {'abbreviation' : 'PH', 'name' : 'Philippines'},
    {'abbreviation' : 'PN', 'name' : 'Pitcairn'},
    {'abbreviation' : 'PL', 'name' : 'Poland'},
    {'abbreviation' : 'PT', 'name' : 'Portugal'},
    {'abbreviation' : 'PR', 'name' : 'Puerto Rico'},
    {'abbreviation' : 'QA', 'name' : 'Qatar'},
    {'abbreviation' : 'RE', 'name' : 'Reunion'},
    {'abbreviation' : 'RO', 'name' : 'Romania'},
    {'abbreviation' : 'RU', 'name' : 'Russian Federation'},
    {'abbreviation' : 'RW', 'name' : 'Rwanda'},
    {'abbreviation' : 'BL', 'name' : 'Saint Barthelemy'},
    {'abbreviation' : 'SH', 'name' : 'Saint Helena'},
    {'abbreviation' : 'KN', 'name' : 'Saint Kitts And Nevis'},
    {'abbreviation' : 'LC', 'name' : 'Saint Lucia'},
    {'abbreviation' : 'MF', 'name' : 'Saint Martin'},
    {'abbreviation' : 'PM', 'name' : 'Saint Pierre And Miquelon'},
    {'abbreviation' : 'VC', 'name' : 'Saint Vincent And Grenadines'},
    {'abbreviation' : 'WS', 'name' : 'Samoa'},
    {'abbreviation' : 'SM', 'name' : 'San Marino'},
    {'abbreviation' : 'ST', 'name' : 'Sao Tome And Principe'},
    {'abbreviation' : 'SA', 'name' : 'Saudi Arabia'},
    {'abbreviation' : 'SN', 'name' : 'Senegal'},
    {'abbreviation' : 'RS', 'name' : 'Serbia'},
    {'abbreviation' : 'SC', 'name' : 'Seychelles'},
    {'abbreviation' : 'SL', 'name' : 'Sierra Leone'},
    {'abbreviation' : 'SG', 'name' : 'Singapore'},
    {'abbreviation' : 'SK', 'name' : 'Slovakia'},
    {'abbreviation' : 'SI', 'name' : 'Slovenia'},
    {'abbreviation' : 'SB', 'name' : 'Solomon Islands'},
    {'abbreviation' : 'SO', 'name' : 'Somalia'},
    {'abbreviation' : 'ZA', 'name' : 'South Africa'},
    {'abbreviation' : 'GS', 'name' : 'South Georgia And Sandwich Isl.'},
    {'abbreviation' : 'ES', 'name' : 'Spain'},
    {'abbreviation' : 'LK', 'name' : 'Sri Lanka'},
    {'abbreviation' : 'SD', 'name' : 'Sudan'},
    {'abbreviation' : 'SR', 'name' : 'Suriname'},
    {'abbreviation' : 'SJ', 'name' : 'Svalbard And Jan Mayen'},
    {'abbreviation' : 'SZ', 'name' : 'Swaziland'},
    {'abbreviation' : 'SE', 'name' : 'Sweden'},
    {'abbreviation' : 'CH', 'name' : 'Switzerland'},
    {'abbreviation' : 'SY', 'name' : 'Syrian Arab Republic'},
    {'abbreviation' : 'TW', 'name' : 'Taiwan'},
    {'abbreviation' : 'TJ', 'name' : 'Tajikistan'},
    {'abbreviation' : 'TZ', 'name' : 'Tanzania'},
    {'abbreviation' : 'TH', 'name' : 'Thailand'},
    {'abbreviation' : 'TL', 'name' : 'Timor-Leste'},
    {'abbreviation' : 'TG', 'name' : 'Togo'},
    {'abbreviation' : 'TK', 'name' : 'Tokelau'},
    {'abbreviation' : 'TO', 'name' : 'Tonga'},
    {'abbreviation' : 'TT', 'name' : 'Trinidad And Tobago'},
    {'abbreviation' : 'TN', 'name' : 'Tunisia'},
    {'abbreviation' : 'TR', 'name' : 'Turkey'},
    {'abbreviation' : 'TM', 'name' : 'Turkmenistan'},
    {'abbreviation' : 'TC', 'name' : 'Turks And Caicos Islands'},
    {'abbreviation' : 'TV', 'name' : 'Tuvalu'},
    {'abbreviation' : 'UG', 'name' : 'Uganda'},
    {'abbreviation' : 'UA', 'name' : 'Ukraine'},
    {'abbreviation' : 'AE', 'name' : 'United Arab Emirates'},
    {'abbreviation' : 'GB', 'name' : 'United Kingdom'},
    {'abbreviation' : 'US', 'name' : 'United States'},
    {'abbreviation' : 'UM', 'name' : 'United States Outlying Islands'},
    {'abbreviation' : 'UY', 'name' : 'Uruguay'},
    {'abbreviation' : 'UZ', 'name' : 'Uzbekistan'},
    {'abbreviation' : 'VU', 'name' : 'Vanuatu'},
    {'abbreviation' : 'VE', 'name' : 'Venezuela'},
    {'abbreviation' : 'VN', 'name' : 'Viet Nam'},
    {'abbreviation' : 'VG', 'name' : 'Virgin Islands, British'},
    {'abbreviation' : 'VI', 'name' : 'Virgin Islands, U.S.'},
    {'abbreviation' : 'WF', 'name' : 'Wallis And Futuna'},
    {'abbreviation' : 'EH', 'name' : 'Western Sahara'},
    {'abbreviation' : 'YE', 'name' : 'Yemen'},
    {'abbreviation' : 'ZM', 'name' : 'Zambia'},
    {'abbreviation' : 'ZW', 'name' : 'Zimbabwe'}
];

export default countries;
