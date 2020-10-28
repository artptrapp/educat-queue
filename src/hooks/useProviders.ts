const defaultProviders = [
  {
    name: 'Academia Brasileira de Neurologia (Abneuro)',
    value: 'ABNEURO'
  },
  {
    name: 'Associação Brasileira de Otorrinolaringologia (Aborl)',
    value: 'ABORL'
  },
  {
    name: 'Departamento de Imagem Cardiovascular (Dic)',
    value: 'DIC'
  },
  {
    name: 'Federação Brasileira das Associações de Ginecologia e Obstetrícia (Febrasgo)',
    value: 'FEBRASGO'
  },
  {
    name: 'Sociedade Brasileira de Angiologia e Cirurgia Vascular (Sbacv)',
    value: 'SBACV'
  },
  {
    name: 'Sociedade Brasileira de Mastologia (Sbmt)',
    value: 'SBMT'
  },
  {
    name: 'Sociedade Brasileira de Nefrologia (Sbn)',
    value: 'SBN'
  },
  {
    name: 'Sociedade Brasileira de Pediatria (Sbp)',
    value: 'SBP'
  }
]

export function useProviders() {

  const providers = defaultProviders

  return providers
}

export default useProviders
